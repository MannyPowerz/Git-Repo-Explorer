// RESPONSIBILITY: Validates incoming JWTs to authenticate users and populates the Request object with identity data.
// DATA FLOW: Header (Authorization) -> Extract -> Verify (JWT_SECRET) -> Attach User -> next() or Error.

// IMPORT: Request, Response, and NextFunction from express to define the middleware signature correctly.
// IMPORT: jwt from jsonwebtoken to verify the integrity and expiration of the incoming token.

import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// INTERFACE: Define IAuthPayload with an 'id: string' property to strictly type your decoded token.
// WHY: This replaces 'any' so TypeScript knows exactly what properties are available on the user object.

interface IAuthPayload {
    id: string
}

// DECLARATION MERGING: Open the Express namespace and the Request interface to add the 'user' property.
// WHY: Use your IAuthPayload interface here so req.user is typed project-wide, preventing compiler errors in controllers.

declare global {
    namespace Express {
        interface Request {
            user?: IAuthPayload
        }
    }
}
/**
 * THE BOUNCER LOGIC
 * Follows the 6-step authentication check:
 */

// STEP 1: Define the named export 'protect' with the (req, res, next) signature.

const protect = (req: Request, res: Response, next: NextFunction) => {

// STEP 2: Initialize a 'token' variable. Look for 'authorization' in req.headers and verify it starts with 'Bearer'.
    let token: string | undefined;
    const auth = req.headers.authorization;

    if (auth && auth.startsWith("Bearer") ) {
// STEP 3: If found, use .split(' ') to grab the second element of the string—this is your actual JWT.
    
        token = auth.split(' ')[1];
    }
// STEP 4: AUTH CHECK 1 - If no token exists, stop the flow and return a 401 status with a "Not authorized" message.
    if (!token) {
        return res.status(401).json({
            message : "Not authorized"
        });
    }

// STEP 5: VERIFICATION - Inside a try/catch block, use jwt.verify() with your process.env.JWT_SECRET.
// NOTE: Explicitly cast the result of verify() to your IAuthPayload interface.

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        ) as IAuthPayload
    

// STEP 6: IDENTITY ATTACHMENT - Set req.user equal to your verified/decoded object.

        req.user = decoded;
// STEP 7: PROCEED - Call next() to release the request to the next middleware or controller.
        next()
// STEP 8: ERROR HANDLING - In the catch block, return a 401 status to stop unauthorized or forged tokens.
    } catch {
        return res.status(401).json({ message : "Not authorized, token failed"})
    }
}
// EXPORT: (Named export only) The protect function is now ready to be imported into your routes.

export {protect};