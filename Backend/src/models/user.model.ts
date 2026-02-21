import { Schema, model, Document, Model } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';

// --- INTERFACES ---
/**
 * RESEARCH: "TypeScript Declaration Merging with Mongoose Documents"
 * Why extend Document? It gives 'this' access to Mongoose-specific methods like .isModified().
 */
interface IGitHubRepo {
  repoId: number;
  name: string;
  description?: string;
  starCount: number;
  language: string;
  link: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  favorites: IGitHubRepo[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// --- STEP 1: JOI VALIDATION SCHEMA ---
/**
 * RESEARCH: "Client-side vs Server-side vs Database-level validation"
 * Why Joi? It acts as the 'Gatekeeper.' If the request body is garbage, 
 * we stop it before it ever touches our expensive database resources.
 */
export const validateUser = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters'
    })
  });
  return schema.validate(user);
};

// --- STEP 2: MONGOOSE SCHEMAS ---
const repoSchema = new Schema<IGitHubRepo>({
  repoId: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  starCount: { type: Number, default: 0 },
  language: { type: String },
  link: { type: String, required: true }
});

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, // Security: Never leaked in queries
  favorites: [repoSchema]
}, { timestamps: true });

// --- STEP 3: PRE-SAVE HOOK (The Hashing Logic) ---
/**
 * RESEARCH: "Mongoose Middleware: Serial vs Parallel hooks"
 * RESEARCH: "Bcrypt Salt Rounds: The trade-off between security and speed"
 * Why this.isModified? To prevent re-hashing an already hashed password when updating favorites.
 */
userSchema.pre<IUser>('save', async function (next: (err?: Error) => void) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// --- STEP 4: INSTANCE METHOD (Comparison) ---
/**
 * RESEARCH: "Mongoose Methods vs Statics"
 * Why not an arrow function? Arrow functions do not bind 'this' to the document instance.
 * Why bcrypt.compare? To safely check plain text against a one-way hash.
 */
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = model<IUser>('User', userSchema);