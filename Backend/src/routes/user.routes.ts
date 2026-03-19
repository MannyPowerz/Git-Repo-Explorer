// RESPONSIBILITY: This module manages User-specific data (Favorites), ensuring all actions are authenticated.
// DATA FLOW: Request -> index.ts (Prefix: /api/users) -> user.routes.ts -> protect (Bouncer) -> user.controller.ts

// IMPORT: express.Router - provides a modular "mini-app" instance for resource-specific (Favorites) routing.
import { Router } from 'express';

// IMPORT: Middleware - our "Bouncer" that validates the JWT before allowing any downstream execution.
import { protect } from '../middleware/authMiddleware';

// IMPORT: Controllers - provides the logic for fetching, appending, and purging user favorite records.
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorites';

// INSTANCE: Initializes a dedicated router to be mounted in the primary application for User domain management.
const userRouter  = Router();

// BOUNCER: Applies the protection middleware to every route defined below this line (global to this router).
userRouter.use(protect);



// GET /favorites: Retrieves the authenticated user's collection of saved repositories from the Model.
// EXPECTS: Valid JWT in the Authorization Header.
userRouter.get('/favorites', getFavorites);

// POST /favorites: Validates the repository payload and appends it to the user's favorites array.
// EXPECTS: { repoId, name, link, ... } in req.body.
userRouter.post('/favorites', addFavorite);

// DELETE /favorites/:id: Uses a Route Parameter (:id) to identify and remove a specific repository.
// EXPECTS: The unique ID of the favorite to be passed directly in the URL path.
userRouter.delete('/favorites/:id', removeFavorite);

// EXPORT: Provides a fully secured routing module for central mounting in index.ts under a versioned prefix.
export default userRouter ;


