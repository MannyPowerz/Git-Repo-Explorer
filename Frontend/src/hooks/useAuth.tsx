// RESPONSIBILITY: Initializes the global authentication Vault, manages the session lifecycle via state, and exposes a hook for components to access it.
// DATA FLOW: Component -> useAuth() -> AuthProvider State -> authService API Call -> State Update -> Component Re-render.

// IMPORT: createContext, useContext, useState, useEffect, ReactNode from 'react'.
// IMPORT: authService from '../services/authService'.
// IMPORT: IUser, IAuthResponse from '../types'.



/**
 * INTERFACE: IAuthContext
 * 1. user: IUser | null. (The logged-in user data).
 * 2. isAuthenticated: boolean. (A simple flag so components don't have to check if user !== null).
 * 3. loading: boolean. (Crucial to prevent rendering protected routes before the useEffect finishes checking localStorage).
 * 4. login: (email, password) => Promise<void>.
 * 5. register: (email, password) => Promise<void>.
 * 6. logout: () => void.
 */

// CONTEXT CREATION: Create 'AuthContext' using createContext<IAuthContext | undefined>(undefined).

/**
 * PROVIDER COMPONENT: AuthProvider
 * 1. SIGNATURE: Export a component named 'AuthProvider' that accepts '{ children }: { children: ReactNode }'.
 * 2. STATE (User): Initialize 'user' state as 'IUser | null'.
 * 3. STATE (Loading): Initialize 'loading' state as 'true'. (Assume we are loading until we check storage).
 */



/**
 * EFFECT (The Initial Mount Check)
 * 1. HOOK: Run useEffect with an empty dependency array [] so it only fires ONCE when the app loads.
 * 2. RETRIEVAL: Check localStorage for 'user' and 'token'.
 * 3. VALIDATION: If both exist, use JSON.parse() to convert the user string back to an object and setUser(parsedUser).
 * 4. COMPLETION: Set 'loading' to false inside a 'finally' block or after the checks, so the app knows it can safely render.
    * useEffect should also handle the case where JSON.parse() fails — if someone manually corrupts localStorage, your app would crash. A try/catch inside the effect would handle that. Just keep it in mind when you write the real code.
 */

/**
 * WRAPPER FUNCTIONS (The State Mutators)
 * 1. LOGIN: Async function. Await authService.login(). Take the returned user, call setUser(), and set loading to false.
 * 2. REGISTER: Async function. Await authService.register(). Take the returned user, call setUser().
 * 3. LOGOUT: Sync function. Call authService.logout() to clear localStorage, then instantly setUser(null).
 */

// RETURN: Return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}> wrapping {children}.

/**
 * CUSTOM HOOK: useAuth
 * 1. SIGNATURE: Export default function 'useAuth'.
 * 2. CONSUME: const context = useContext(AuthContext).
 * 3. THE GUARD: If (!context), throw a fatal error: "useAuth must be used within an AuthProvider". 
 * WHY: This instantly catches developers trying to use the hook outside the Context tree.
 * 4. RETURN: return context.
 */