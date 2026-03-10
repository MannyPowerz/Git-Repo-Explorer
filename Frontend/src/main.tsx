// RESPONSIBILITY: The React Entry Point. Injects all global context providers into the component tree and mounts to the DOM.
// DATA FLOW: React DOM -> QueryClientProvider -> AuthProvider -> App (Router).

// IMPORT: React, ReactDOM.createRoot.
  // {React} - The compiler is now smart enough to auto-inject the necessary JSX engine automatically without you having to manually import React into the scope.
  // {React} - destructured StrictMode directly out of the library. If you had written <React.StrictMode>, then you would be using the React import
  // createRoot - to display React components within a browser's Document Object Model (DOM) element. It is the entry point that connects the React application's logic to the traditional browser DOM and is used to manage the DOM inside the specified container.
// IMPORT: QueryClient, QueryClientProvider from '@tanstack/react-query'.
  //@tanstack/react-query - library for managing server state in React applications. It simplifies common challenges associated with fetching, caching, synchronizing, and updating data from remote sources, replacing complex manual logic involving useState and useEffect hooks
    // QueryClientProvider -  component that uses  React's Context API to provide the QueryClient instance to all components wrapped within it , Context : ensures that every part of your application shares the same data management logic and cache,must wrap application's components to allow all child components to use hooks
      //  Without it React Query hooks used in your application will not function and will throw an error because they cannot access the necessary QueryClient instance
    // QueryClient - a class that is the "brain" of TanStack Query handle all server state logic. Its responsibilities include
      // customized variations of a QueryClient instance that behave significantly differently depending on how you construct them.
// IMPORT: AuthProvider from './hooks/useAuth' (or context).
// IMPORT: App from './App'.
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./hooks/useAuth";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";


/**
 * INSTANTIATION: The Query Client
 * 1. LOGIC: Initialize 'const queryClient = new QueryClient()'.
 * WHY: This creates the isolated cache memory bank that all your useQuery hooks will tap into.
 */

const queryClient = new QueryClient()



/**
 * RENDER: The Provider Matryoshka Doll
 * 1. TARGET: Find the HTML element 'document.getElementById('root')'.
 * 2. RENDER ROOT: Use 'ReactDOM.createRoot().render(...)'.
 * 3. STRICT MODE: Wrap everything in <React.StrictMode> to catch bad lifecycle practices.
 * 4. LAYER 1: Wrap with <QueryClientProvider client={queryClient}>.
 * 5. LAYER 2: Wrap with <AuthProvider>.
 * 6. CORE: Render <App /> inside the providers.
 * * WHY THIS ORDER?: Providers only share data with components INSIDE them. By putting Auth and Query at the very top of 'main.tsx', you guarantee that 100% of your routing and page components have access to the vault and the cache.
 */

//web page as a frame and React as the picture

// browser is a giant tree of elements (HTML tags). This line tells the browser: "Go find the specific box labeled root."
// Find the hook on the wall
// document.getElementById might return null if the element doesn't exist\
const domNode = document.getElementById("root")


// createRoot() It tells the browser: "From now on, don't worry about what happens inside this div. React is the boss here now." 
    // createRoot: Attach the bracket to the hook
// createRoot() Creates a "Manager" (the Root) that stays organized and handles all the updates made
// By adding !, you are telling TypeScript: "I promise this element exists. Don't worry about it being null; just treat it as a valid DOM node." 
    // Swear that the hook isn't missing

// render() is the command to actually show something
createRoot(domNode!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
      
  </StrictMode>,
)


