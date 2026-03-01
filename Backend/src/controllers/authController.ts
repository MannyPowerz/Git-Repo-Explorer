import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// IMPORTANT: Path must point to the model file above. 
// DO NOT import User from this controller file itself!
import { User, validateUser } from '../models/user.model';
import { catchAsync } from '../utils/catchAsync';

/**
 * REGISTER CONTROLLER
 */
export const register = catchAsync(async (req: Request, res: Response) => {
  // STEP 1: JOI VALIDATION
  /**
   * RESEARCH: "Destructuring Assignment in TypeScript"
   * Why 'value'? Joi cleans the data (e.g., lowercase email) during validation.
   */
  const { error, value } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // STEP 2: DUPLICATE CHECK
  /**
   * RESEARCH: "HTTP Status Code 409 (Conflict) vs 400 (Bad Request)"
   * Why manually check? To give the user a clear message before Mongoose throws a 11000 error.
   */
  const existingUser = await User.findOne({ email: value.email });
  if (existingUser) return res.status(409).json({ message: 'Email already in use' });

  // STEP 3: PERSISTENCE
  /**
   * RESEARCH: "Mongoose .create() method - how it handles pre-save hooks"
   * Note: The password hashing is handled internally by the Model hook we wrote.
   */
  const newUser = await User.create({
    email: value.email,
    password: value.password
  });

  // STEP 4: JWT SIGNING
  /**
   * RESEARCH: "JWT Payloads: Why you should never put sensitive data (like passwords) inside"
   * Why 'process.env.JWT_SECRET'? To keep your secret key out of GitHub/Source control.
   */
  const token = jwt.sign(
    { id: newUser._id }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '1d' }
  );

  res.status(201).json({ status: 'success', token });
});

/**
 * LOGIN CONTROLLER
 */
export const login = catchAsync(async (req: Request, res: Response) => {
  // STEP 1: INPUT CHECK
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Provide email and password' });

  // STEP 2: FIND USER & FORCE PASSWORD SELECTION
  /**
   * RESEARCH: "Mongoose +field and -field syntax"
   * Why '+password'? Because the model blocks it by default for security. We need it to compare.
   */
  const user = await User.findOne({ email }).select('+password');

  // STEP 3: PASSWORD VALIDATION
  /**
   * RESEARCH: "Timing Attacks in Authentication"
   * Why use an instance method? It keeps the authentication logic centralized in the Model.
   */
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // STEP 4: TOKEN DISPATCH
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  
  res.status(200).json({ status: 'success', token, user: { id: user._id, email: user.email } });
});