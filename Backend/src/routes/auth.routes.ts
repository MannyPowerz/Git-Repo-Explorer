// RESPONSIBILITY ____________________________________________
// RESPONSIBILITY: This "Mini-App" encapsulates all Auth domain routing, decoupling URI maps from business logic.
// DATA FLOW_________________________________________________
// DATA FLOW: Request -> app.ts (Prefix: /api/auth) -> auth.routes.ts (Route Match) -> auth.controller.ts (Logic).

// IMPORTS WITH ONE-LINE REEASONS___________________________
// IMPORT: express.Router - creates an isolated namespace to prevent polluting the global app instance.
import { Router } from 'express';


// IMPORT: Controllers - implements Separation of Concerns (SoC) by offloading execution to the Logic Layer.
import { register, login } from '../controllers/authController';


// CODE WITH ONE-LINE EXPLANATIONS______________________________
// INSTANCE: Initializes a dedicated router to be mounted as a middleware sub-module in the main entry point.
const authRouter = Router();



// POST /register: Authenticates payload and persists a new User document via the Model's pre-save hashing.
// EXPECTS: { email, password } in req.body
authRouter.post('/register', register);


// POST /login: Validates credentials and issues a stateless JWT for secure session management.
// EXPECTS: { email, password } in req.body
authRouter.post('/login', login);

// EXPORT ___________________________________________________ 
// EXPORT: Provides a configured module for central mounting in index.ts under a versioned prefix.
export default authRouter;





// _____________________________________________________________

// Deeper Context

// RESPONSBILTY ---------------------------------------

//  encapsulating all related functionality (routes, handlers, and specific middleware) in one place.





 

    // The module exports a configured [Router object/express.Router instance] which is designed to be mounted in the main application under a specific route prefix (e.g., '/api/feature').



    // This approach ensures modularity,  separation of concerns, and simplifies maintenance by keeping all related logic co-located.



        // Example :

                // const featureRouter = require('./featureModule');

                // app.use('/api/feature', featureRouter);





// IMPORTS ---------------------------------------



// This module implements the "Mini-App" pattern by utilizing an express.Router instance.



// Its primary purpose is to decouple the URI routing logic from the main application entry point, enabling a modular, scalable architecture.



// System Design Note:

    // Requests -> Router (Map) -> Controller (Logic) -> Model (Data)



    // 1. express.Router:

    // We import the Router class to create an isolated instance. This "mini-app" allows us to define middleware and routes for a specific domain (Auth) before mounting it to the primary Express application.



    // 2. Controller Logic:

    // We import specific handlers (register, login) from the Controller layer.  This maintains a strict 'Separation of Concerns' (SoC)—the Router only directs traffic, while the Controller executes the business logic.



    // Implementation Example :

        // const authRouter = require('./routes/auth.routes');

        // app.use('/api/v1/auth', authRouter); // Routing prefixing



// STEP 1: IMPORT LOGIC FROM CONTROLLERS

    // Why: Keeping logic outside routes makes unit testing possible and refactoring easy.

    // We are importing named exports from the controller to keep the namespace clean.



// STEP 2: INITIALIZE ROUTER INSTANCE

    /** WHY: This 'mini-app' can be mounted under a specific prefix  (e.g., /api/v1/auth) in app.ts.

   

    Learn why using a Router instance is better for memory and  organization than attaching 50+ routes directly to the 'app' * object.



    RESEARCH: "The memory footprint of Router instances inhigh-traffic Node.js apps"

     */



// STEP 3 :

    // Why we use POST for both. (Register creates a resource;  Login creates a session/token, making POST the semantically correct verb).

    // Why POST? Because registration and login both involve sending sensitive data in the request body, which is more secure than URL parameters.

 

    // RESEARCH: "RESTful API naming conventions: Why we use POST for login (Statelessness)"

    // RESEARCH: "HTTP Verbs and Idempotency"



    // STEP 4: AUTHENTICATION ROUTES

        //EXAMPLE:

        // URL: /api/v1/auth/register

        // ACTION: Locates the 'register' function in auth.controller.ts

            // router.post('/register', register);

        // URL: /api/v1/auth/login

        // ACTION: Locates the 'login' function in auth.controller.ts

            // router.post('/login', login);

   

// STEP 4: EXPORT FOR CENTRAL MOUNTING

    // Why: This allows us to keep our main app.ts clean and focused on global middleware and server setup, while this module handles all auth-related routing logic.