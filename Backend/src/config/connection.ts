import mongoose from 'mongoose';

const dbURI = process.env.MONGODB_URI;

async function connectToDatabase() {
    if (!dbURI) {
        console.error('MONGODB_URI is not defined in environment variables');
        process.exit(1)
    }
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1)
    }    
}

export default connectToDatabase;