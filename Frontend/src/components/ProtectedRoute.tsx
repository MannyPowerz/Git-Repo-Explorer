// RESPONSIBILITY: Blocks unauthorized access and provides a seamless visual transition while verifying session tokens.
// DATA FLOW: React Router -> ProtectedRoute -> wait for useAuth -> Skeleton UI -> Navigate OR Outlet.

// IMPORT: 'Navigate', 'Outlet' from 'react-router-dom'.
// IMPORT: 'useAuth' from '../hooks/useAuth'.
// IMPORT: A Skeleton component or CSS module.



/**
 * COMPONENT: ProtectedRoute
 * 1. AUTH STATE: Destructure '{ isAuthenticated, loading }' from 'useAuth()'.
 */

/**
 * RENDER: The Gatekeeper Logic
 * 1. THE SKELETON TRAP: If 'loading' is true, return a Skeleton UI layout (e.g., '<div className="skeleton-container">...</div>').
 * WHY: When the user refreshes the page, the browser takes ~100ms to parse localStorage. If you don't show a skeleton, the UI jumps erratically. A skeleton maintains the layout dimensions while the auth check finishes.
 * 2. THE BOUNCER: If '!loading && !isAuthenticated', return '<Navigate to="/login" replace />'.
 * 3. THE VIP ACCESS: If '!loading && isAuthenticated', return '<Outlet />'.
 */