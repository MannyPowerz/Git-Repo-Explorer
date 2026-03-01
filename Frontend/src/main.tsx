// RESPONSIBILITY: The React Entry Point. Injects all global context providers into the component tree and mounts to the DOM.
// DATA FLOW: React DOM -> QueryClientProvider -> AuthProvider -> App (Router).

// IMPORT: React, ReactDOM.createRoot.
// IMPORT: QueryClient, QueryClientProvider from '@tanstack/react-query'.
// IMPORT: AuthProvider from './hooks/useAuth' (or context).
// IMPORT: App from './App'.

/**
 * INSTANTIATION: The Query Client
 * 1. LOGIC: Initialize 'const queryClient = new QueryClient()'.
 * WHY: This creates the isolated cache memory bank that all your useQuery hooks will tap into.
 */

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