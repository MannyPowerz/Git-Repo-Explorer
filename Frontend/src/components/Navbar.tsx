// RESPONSIBILITY: Provides global site navigation without triggering hard browser reloads.
// DATA FLOW: useAuth (State) -> Navbar -> User Click -> React Router <Link> -> Component Swap.

// IMPORT: 'Link' and 'useNavigate' from 'react-router-dom'.
// IMPORT: 'useAuth' from '../hooks/useAuth'.



/**
 * COMPONENT: Navbar
 * 1. AUTH STATE: Destructure '{ isAuthenticated, logout, user }' from 'useAuth()'.
 * 2. ROUTING: Initialize 'const navigate = useNavigate()'.
 */

/**
 * HANDLER: handleLogout
 * 1. LOGIC: Call 'logout()', then 'navigate("/login")'.
 */

/**
 * RENDER: JSX Layout
 * 1. THE SPA RULE: Use '<Link to="/...">' for ALL internal navigation. NEVER use '<a href="/...">'.
 * WHY: An <a> tag makes the browser request a brand new HTML document from the server, wiping out your entire React state (Auth Context, Search Results, everything). <Link> intercepts the click and instantly swaps the JS component in memory.
 * 2. CONDITIONAL RENDERING (Logged In): Render Favorites <Link>, user email, and Logout button.
 * 3. CONDITIONAL RENDERING (Logged Out): Render Login <Link> and Register <Link>.
 */