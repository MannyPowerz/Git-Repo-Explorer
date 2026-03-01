// RESPONSIBILITY: Acts as the absolute source of truth for all data shapes flowing between the UI, the State, and the Backend.
// DATA FLOW: Frontend flow is circular. The user interacts with the UI, triggers an action, calls an API, updates state, and re-renders.
// 
// User Action -> Component -> Service (API call) -> Backend
//                   ^                                  |
//                   |---- State Update <- Response <---|



/**
 * INTERFACE 1: IRepo
 * WHY: This must be a 1:1 mirror of your backend's 'IGitHubRepo' schema. 
 * If the API returns it, the UI needs to know how to read it.
 */
// STEP 1: Export an interface named IRepo.
// STEP 2: Define 'repoId' as a number.
// STEP 3: Define 'name' as a string.
// STEP 4: Define 'description' as an optional string (use the ? operator).
// STEP 5: Define 'starCount' as a number.
// STEP 6: Define 'language' as a string.
// STEP 7: Define 'link' as a string.

/**
 * INTERFACE 2: IUser
 * WHY: Defines the shape of YOUR authenticated user payload, not GitHub's. 
 * This is what you store in your frontend state (like React Context or Redux) after login.
 */
// STEP 1: Export an interface named IUser.
// STEP 2: Define 'email' as a string.
// STEP 3: Define 'favorites' as an array of 'IRepo' objects.

/**
 * INTERFACE 3: IAuthResponse
 * WHY: Matches the exact JSON object your backend 'auth.controller.ts' sends back on a successful 200/201 response.
 * Don't over-engineer this. Build exactly what your controller spits out.
 */
// STEP 1: Export an interface named IAuthResponse.
// STEP 2: Define 'status' as a string (this will catch your 'success' message).
// STEP 3: Define 'token' as a string (this is the JWT your frontend needs to save to localStorage).
// STEP 4: Define 'user' as a nested object containing 'id' (string) and 'email' (string).

// EXPORT NOTE: In TypeScript type definition files, you simply place the 'export' keyword directly in front of each interface declaration.