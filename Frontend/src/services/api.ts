// RESPONSIBILITY: Centralized HTTP client configured to handle all backend communications, base URLs, and global headers.
// DATA FLOW: UI Action -> Service Call -> Axios Interceptor (Injects Token) -> Backend API -> Response -> UI State.

// IMPORT: axios - the core HTTP library used to create a configurable client instance.
import axios from 'axios';


// INSTANCE: Create a pre-configured Axios instance using axios.create().

// 1. CONFIG: Set the 'baseURL' property (e.g., 'http://localhost:8000/api').
    // api.post('/auth/login') instead of axios.post('http://localhost:8000/api/auth/login') By setting baseURL, you can use relative paths in your service calls, which keeps your code cleaner and more maintainable.
    // Research how Vite handles environment variables — what prefix they need and how you read them in code. You'll set baseURL to that environment variable instead of a hardcoded string 
    // Your frontend on Vercel needs to point to your Render backend URL, not localhost. This value needs to come from an environment variable, just like you did on the backend with process.env.
    // In React projects built with Vite, environment variables work differently than Node.js. They must be prefixed with a specific word for Vite to expose them to your frontend code, and you access them through a different object
// WHY: So you never have to hardcode the full server domain path in your individual service calls. If your server moves, you only change it here.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})




// INTERCEPTOR: Attach a request interceptor to your new instance (instance.interceptors.request.use).
// WHY WE USE AN HTTP INTERCEPTOR: It acts as a global tollbooth. Instead of manually writing 
// the Authorization header in 50 different API calls (which violates the DRY principle), 
// the interceptor automatically catches EVERY outgoing request and injects the token before it leaves the frontend.

api.interceptors.request.use(


// STEP 1 (Inside Interceptor callback): Retrieve the saved JWT string from the browser's 'localStorage'.
// STEP 2: Check if that token actually exists.
// STEP 3: If it exists, mutate the 'config.headers.Authorization' property to equal `Bearer ${token}`.
    // do not forget the space after the word "Bearer". If you send BearerMyToken123, your backend string .split(' ')[1] will fail because it expects a space to separate the two parts of the header value.
// STEP 4: Return the modified 'config' object so the request can proceed to the network.
// STEP 5: Provide an error callback to reject the Promise if the request configuration fails entirely.
    async (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } 
    , (error) => {
        return Promise.reject(error)
    }
);

// EXPORT: Export this specific configured instance (e.g., 'export default api') so other service files use THIS instance instead of the raw 'axios' library.

export default api;