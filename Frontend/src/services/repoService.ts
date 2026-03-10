// RESPONSIBILITY: Manages all repository data retrieval, bridging external GitHub searches with internal backend CRUD operations.
// DATA FLOW: Component -> repoService -> [External GitHub OR Internal Backend] -> Response -> Component State.

// IMPORT: 'axios' (raw) - for external GitHub API calls that must NEVER use our base URL or leak our JWT.
// IMPORT: 'api' (custom instance) - for internal backend calls that REQUIRE the base URL and JWT interceptor.
// IMPORT: 'IRepo' interface from '../types' to strongly type the expected return arrays.
import axios from 'axios';
import api from './api';
import {type IRepo} from '../types/index';


/**
 * SEARCH REPOS (External API)
 * 1. SIGNATURE: Export an async function 'searchRepos' accepting a 'username' string.
 * 2. THE TRAP AVOIDED: Use RAW 'axios.get', NOT the custom 'api' instance.
 * 3. URL CONSTRUCTION: Dynamically build the exact GitHub path: `https://api.github.com/user/${username}/repos`.
 * 4. RETURN: Await the response and return 'response.data' typed strictly as an array of 'IRepo' objects.
 */

export const searchRepos = async (username: string): Promise<IRepo[]> => {
    const response = await axios.get<IRepo[]>(
        `https://api.github.com/users/${username}/repos`
    );
    return response.data;
};

/**
 * GET FAVORITES (Internal API)
 * 1. SIGNATURE: Export an async function 'getFavorites' taking no parameters.
 * 2. API CALL: Use the custom 'api.get' to hit your backend '/user/favorites' endpoint.
 * 3. AUTHENTICATION: Zero manual token handling required; the Interceptor does the work silently.
 * 4. RETURN: Extract and return the 'data' array from the response object, typed as 'IRepo[]'.
 */
export const getFavorites = async (): Promise<IRepo[]> => {
    const response = await api.get<{status: string, results: IRepo[]}>('/user/favorites');
    return response.data.results;
};
/**
 * ADD FAVORITE (Internal API)
 * 1. SIGNATURE: Export an async function 'addFavorite' expecting a full 'repo' object (type IRepo).
 * 2. API CALL: Use 'api.post' to send the 'repo' payload to '/user/favorites'.
 * 3. RETURN: Return the updated favorites array sent back by your backend controller.
 */



export const addFavorite = async (repo: IRepo): Promise<IRepo[]> => {
    const response = await api.post<{status: string, results: IRepo[]}>('/user/favorites', repo);
    return response.data.results;
};


/**
 * REMOVE FAVORITE (Internal API)
 * 1. SIGNATURE: Export an async function 'removeFavorite' expecting an 'id' (number or string).
 * 2. DYNAMIC URL: Use 'api.delete' and inject the ID directly into the path using template literals (e.g., `/user/favorites/${id}`).
 * 3. RETURN: Return the updated favorites array sent back by the backend to synchronize the UI.
 */

export const removeFavorite = async (id: number): Promise<IRepo[]> => {
    const response = await api.delete<{status: string, results: IRepo[]}>(`/user/favorites/${id}`);
    return response.data.results;
};

// EXPORT: Export the four functions as named exports or default object.