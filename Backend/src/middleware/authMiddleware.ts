// RESPONSIBILITY: Validates incoming JWTs to authenticate users and populates the Request object with identity data.
// DATA FLOW: Header (Authorization) -> Extract -> Verify (JWT_SECRET) -> Attach User -> next() or Error.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// INTERFACE: Defines the shape of our JWT payload to replace 'any' and ensure type safety during decoding.
interface IAuthPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// DECLARATION MERGING: Injects the 'user' property into the Express Request interface for project-wide type visibility.
declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload; 
    }
  }
}

// IMPORT: jwt - provides the verify() method to decode the token and check its integrity against our secret key.
// IMPORT: Types - ensures the middleware signature follows the Express pattern for Request, Response, and NextFunction.

/**
 * THE BOUNCER LOGIC
 * Follows the 6-step authentication check:
 */
export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Check for the Authorization header.
  // 2. Extract token: We expect "Bearer <token>" format.
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 5. If invalid (missing token), stop the process and return a 401.
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // 3. Verify the token using the secret that signed it.
    // CASTING: We cast the result to IAuthPayload to tell TypeScript we are certain of the object's structure.
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IAuthPayload;

    // 4. Attach identity: The decoded payload contains the user ID we put there during login.
    req.user = decoded;

    // 6. Move on: Tell Express the check passed and it can proceed to the controller.
    next();
  } catch (error) {
    // 5. If invalid (expired or forged), stop the process.
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};