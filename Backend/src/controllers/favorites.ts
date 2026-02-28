// RESPONSIBILITY: Manages the lifecycle of a user's repository favorites (CRUD), ensuring data integrity and security.
// DATA FLOW: Request (with req.user.id) -> Database (Mongoose) -> Response (Filtered for sensitive data).

// IMPORT: Request/Response - provides standard Express types for HTTP request and response objects.
// IMPORT: User Model - provides the direct interface for Mongoose document queries and atomic updates.
// IMPORT: catchAsync - wraps async logic to automatically forward errors to the global error middleware.

/**
 * GET FAVORITES
 * 1. IDENTITY: Uses the 'id' property from the 'req.user' object attached by the auth middleware.
 * 2. PROJECTION: Explicitly selects the 'favorites' field to prevent sensitive data leakage (e.g., password hashes).
 * 3. RESPONSE: Returns the user's favorites array with a 200 OK status.
 */



/**
 * ADD FAVORITE
 * 1. PAYLOAD: Extracts the repository metadata object directly from the request body.
 * 2. ATOMIC UPDATE: Uses '$addToSet' to append the repo while natively preventing duplicate entries.
 * 3. RETURN: Requests the updated document via 'new: true' and returns the new favorites list.
 */



/**
 * REMOVE FAVORITE
 * 1. TARGETING: Identifies the specific favorite via the 'id' parameter extracted from the URL.
 * 2. ATOMIC REMOVAL: Uses the '$pull' operator to remove the matching object from the array in one step.
 * 3. CLEANUP: Returns the revised favorites collection to synchronize the client-side state.
 */


// EXPORT: Exports the three handlers for mounting in the user routing module.


// DETAILS_____________________________________________________________

// RESPONSIBILITY: Manages the lifecycle of a user's repository favorites (CRUD), ensuring data integrity and security.
// DATA FLOW: Request (with req.user.id) -> Database (Mongoose) -> Response (Filtered for sensitive data).

// IMPORT: Request/Response types from Express to ensure our handler signatures are standard.
// IMPORT: The User Model to perform database lookups and updates on the 'users' collection.
// IMPORT: catchAsync utility to wrap our logic, automatically passing any rejected promises to the global error handler.

/**
 * GET FAVORITES _________________________________________________
 * 1. IDENTITY: Use the 'id' property from the 'req.user' object (populated by the bouncer middleware).
 * 2. LOOKUP: Query the database for a single user document matching that specific ID.
 * 3. PROJECTION: Explicitly select ONLY the 'favorites' field from the document. 
 * WHY: Best practice is to NEVER assume the model hides sensitive data (like password hashes). 
 * By picking specific fields, you guarantee that even a future model change won't leak secrets.
 * 4. RESPONSE: Send the array of favorites back to the client with a 200 OK status.
 */



/**
 * ADD FAVORITE __________________________________________________
 * 1. PAYLOAD: Extract the repository data (name, link, etc.) from 'req.body'.
 * 2. ATOMIC UPDATE: Use 'findByIdAndUpdate' combined with the '$addToSet' MongoDB operator.
 * WHY: This is an "Atomic Operation." Unlike fetching and saving, this happens in one step. 
 * $addToSet acts as a built-in duplicate check; it will only push the repo if it's not already there.
 * 3. RACE CONDITION PREVENTION: This prevents "double-submit" bugs where two rapid clicks 
 * might otherwise result in the same repository being saved twice in the array.
 * 4. RETURN: Request the updated document back (using the 'new: true' option) and send the new list to the user.
 */



/**
 * REMOVE FAVORITE _______________________________________________
 * 1. TARGETING: Locate the unique ID of the favorite entry via 'req.params.id' (the dynamic part of the URL).
 * 2. ATOMIC REMOVAL: Use 'findByIdAndUpdate' combined with the '$pull' MongoDB operator.
 * WHY: $pull reaches into the array and removes all items that match the condition (the ID) 
 * without needing to load the entire array into the server's memory first.
 * 3. UPDATING: Ensure you are matching the specific favorite's ID inside the user's 'favorites' array.
 * 4. CLEANUP: Return the revised favorites list to the client so the UI can update instantly.
 */



// EXPORT: Export these functions so they can be mapped to the routes defined in 'user.routes.ts'.