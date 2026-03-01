// RESPONSIBILITY: Executes authentication API calls and manages the persistence of the JWT and user data in the browser.
// DATA FLOW: UI Form -> authService -> api.ts (Client) -> Backend -> Response -> localStorage.

// IMPORT: The customized 'api' instance from './api' (NOT raw axios) so your requests hit the correct base URL.
// IMPORT: The 'IAuthResponse' and 'IUser' interfaces from '../types' to enforce strict typing on the API responses.



/**
 * REGISTER
 * 1. SIGNATURE: Export an async function 'register' that accepts an email and password string.
 * 2. API CALL: Use 'api.post' to hit the '/auth/register' endpoint, passing credentials in the body.
 * 3. TYPE ASSERTION: Tell TypeScript the response data will match your 'IAuthResponse' interface.
 * 4. EXTRACTION: Destructure the 'token' and 'user' objects from the successful response.
 * 5. PERSISTENCE (TOKEN): Use 'localStorage.setItem' to securely save the JWT string.
 * 6. PERSISTENCE (USER): Use 'localStorage.setItem' to save the user object (MUST use JSON.stringify() here).
 * 7. RETURN: Return the user object back to the component so the UI can update its global state.
 */

/**
 * LOGIN
 * 1. SIGNATURE: Export an async function 'login' that accepts an email and password string.
 * 2. API CALL: Use 'api.post' to hit the '/auth/login' endpoint with the credentials payload.
 * 3. TYPE ASSERTION: Ensure the response data is typed strictly as 'IAuthResponse'.
 * 4. EXTRACTION: Destructure the 'token' and 'user' objects exactly as you did in register.
 * 5. PERSISTENCE (TOKEN): Use 'localStorage.setItem' to securely save the JWT string.
 * 6. PERSISTENCE (USER): Use 'localStorage.setItem' to save the user object (MUST use JSON.stringify() here).
 * 7. RETURN: Pass the user object back to the calling component to synchronize the UI.
 */

/**
 * LOGOUT
 * 1. SIGNATURE: Export a synchronous function 'logout'. No async/await is needed.
 * WHY NO API CALL: JWTs are stateless. The backend doesn't "remember" sessions, so you don't need to notify it.
 * 2. PURGE (TOKEN): Use 'localStorage.removeItem' to delete the authentication token.
 * 3. PURGE (USER): Use 'localStorage.removeItem' to delete the stringified user data.
 */

// EXPORT: Export these functions (e.g., export const login = ..., or export default { register, login, logout }).