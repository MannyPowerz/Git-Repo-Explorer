// RESPONSIBILITY: Initializes the global authentication Vault, manages the session lifecycle via state, and exposes a hook for components to access it.
// DATA FLOW: Component -> useAuth() -> AuthProvider State -> authService API Call -> State Update -> Component Re-render.

// IMPORT: createContext, useContext, useState, useEffect, ReactNode from 'react'.
// createContext - not needing to do prop drillingn , whihc then "punches a hole in the react matrix", puting certian function in this vault that is outisde of the compnet flor/tree giving access from any component without props being passed down
// useContext - lets a  you reach into createContext as a key to grab availible functions grabbing global data
// ReactNode - typescript definaiton for what is rendered on the screen to type wrapper components (defining type for a prop and gets passed down rendering inside components)
// useEffect - grabs stuff outisde of react like an APi or JWT  pausing the app grabbing fucntion/data grab it and put it into the "vault" since react wipes it ememory on page refresh
import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
// IMPORT: authService from '../services/authService'.
import {register as authRegister, 
      login as authLogin,
      logout as authLogout}  from '../services/authService';
// IMPORT: IUser, IAuthResponse from '../types'.
import {type IRepo, type IUser} from '../types';



/**
 * INTERFACE: IAuthContext
 * 1. user: IUser | null. (The logged-in user data).
 * 2. isAuthenticated: boolean. (A simple flag so components don't have to check if user !== null).
 * 3. loading: boolean. (Crucial to prevent rendering protected routes before the useEffect finishes checking localStorage).
 * 4. login: (email, password) => Promise<void>.
 * 5. register: (email, password) => Promise<void>.
 * 6. logout: () => void.
 */
// is a contract or a menu that shows what is in the "vault", i need it to know exact "shape" to share with the app broken down into two parts State (The Data) and Mutators (The Actions)
interface IAuthContext{
   user: IUser | null,
   favorites: IRepo[];
   isAuthenticated: boolean,
   loading: boolean,
   login : (email: string, password: string) => Promise<void> ,
   register: (email: string, password: string) => Promise<void>,
   logout: () => void
}

// CONTEXT CREATION: Create 'AuthContext' using createContext<IAuthContext | undefined>(undefined).
const AuthContext = createContext<IAuthContext | undefined>(undefined);

/**
 * PROVIDER COMPONENT: AuthProvider
 * 1. SIGNATURE: Export a component named 'AuthProvider' that accepts '{ children }: { children: ReactNode }'.
 * JavaScript Object Destructuring and TypeScript Inline Typing. for this '{ children }: { children: ReactNode }'
 *    takes props object as argument and curly braces gets the property children  as a standalone variable
 *    after colon is the type that perfectlys matches shape of "contract" , 
 *    ReactNode  is the ultimate catch-all type specifically built by React. It means: "Literally anything that React is capable of rendering on a screen
 * 2. STATE (User): Initialize 'user' state as 'IUser | null'.
 * 3. STATE (Loading): Initialize 'loading' state as 'true'. (Assume we are loading until we check storage).
 */
// AuthProvider is a Wrapper Component leaving it emptry is like vault that is not placed in an apprioate place just in no mans land

export const AuthProvider = ({ children } : {children: ReactNode}) => {
   
   const [user, setUser] = useState<IUser | null>(null);
   const [favorites, setFavorites] = useState<IRepo[]>([]);
   const [loading, setLoading] = useState<boolean>(true)
      //starts this as (false), the ProtectedRoute instantly assumes the app is done loading, looks at user: null, and violently kicks the user back to the login screen before the app even has a chance to check if they have a saved session. Starting with (true) locks the UI behind a loading spinner until we are 100% sure of their identity


/**
 * EFFECT (The Initial Mount Check)
 * 1. HOOK: Run useEffect with an empty dependency array [] so it only fires ONCE when the app loads.
 * 2. RETRIEVAL: Check localStorage for 'user' and 'token'.
 * 3. VALIDATION: If both exist, use JSON.parse() to convert the user string back to an object and setUser(parsedUser).
 * 4. COMPLETION: Set 'loading' to false inside a 'finally' block or after the checks, so the app knows it can safely render.
    * useEffect should also handle the case where JSON.parse() fails — if someone manually corrupts localStorage, your app would crash. A try/catch inside the effect would handle that. Just keep it in mind when you write the real code.
 */

   // WHEN AuthProvider renders on the screen, useEffect triggers.  
   useEffect( () => {
      // create a fucntion and then call it 
      // reaches otuide of Reactes memory abnd get sinto localStorage
      const initialAuth = () => {
         try {
            //finds JWT and turns the user object into a tring putting it into a state to put it back into React's memory
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('jwtToken');
         
            if (storedUser && storedToken) {
               setUser(JSON.parse(storedUser))
            }         
         } catch (error) {

            console.error("Corrupted local storage data. Purging...", error);

            // to keep the app from crashing since a posoiblity of the corrupted info when trying to parse is still sitting in the harddrive sitting in broswer wasting CPU cycles and memory forocing user back to clean slate 

            localStorage.removeItem('user');
            localStorage.removeItem('jwtToken');

         } finally {
             // then loading is is set it to false after knowing who the user is now rendering the protected pages
            setLoading(false);
         }
      };
      initialAuth();
   }, []); // dependecy array tells it to run only whehn the app starts when there is nothing in terms of running the hardrive check  to go into localStorage to find JWT


/**
 * WRAPPER FUNCTIONS (The State Mutators)
 * 1. LOGIN: Async function. Await authService.login(). Take the returned user, call setUser(), and set loading to false.
 * 2. REGISTER: Async function. Await authService.register(). Take the returned user, call setUser().
 * 3. LOGOUT: Sync function. Call authService.logout() to clear localStorage, then instantly setUser(null).
 */
   const login = async (email: string, password: string): Promise<void> => {
      const userData = await authLogin(email, password); // Returns IUser directly
      setUser(userData);
   };

   const register = async (email: string, password: string): Promise<void> => {
      const userData = await authRegister(email, password); // Returns IUser directly
      setUser(userData);
   };

   const logout = (): void => {
      authLogout(); // Calls the authService which wipes both 'user' and 'jwtToken'
      setUser(null);
   };
// RETURN: Return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}> wrapping {children}.
   const payload = {
      user: user,
      favorites: favorites,
      setFavorites: setFavorites,
      isAuthenticated: !!user,
      loading: loading,
      login: login,
      register: register,
      logout: logout
   }

   return (
      // createContext() created a Blueprint, AuthContext.Provider is the actual, physical building built from that blueprint  
         //wrapping it around {children} (your application), you are physically placing your application inside this building
         // .Provider component attached to them. Its entire job is to act as a broadcast antenna to any component that lives inside of it
         // value prop is instantly piped through the walls to every single room (component) in your application
            // If the Navbar needs to know who the user is, it plugs into the wall (useContext) and draws power from this exact value prop.
            // The Outer Braces { }: In JSX (React HTML) vlaue = { }
            // The Inner Braces { } : JavaScript Object - {payload}


      <AuthContext.Provider value={payload} > 
         { children }
      </AuthContext.Provider>
   )

};

/**
 * CUSTOM HOOK: useAuth
 * 1. SIGNATURE: Export default function 'useAuth'.
 * 2. CONSUME: const context = useContext(AuthContext).
 * 3. THE GUARD: If (!context), throw a fatal error: "useAuth must be used within an AuthProvider". 
 * WHY: This instantly catches developers trying to use the hook outside the Context tree.
 * 4. RETURN: return context.
 */
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
   }
   return context;
}
