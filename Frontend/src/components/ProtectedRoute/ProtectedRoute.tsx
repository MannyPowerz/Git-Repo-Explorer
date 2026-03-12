// RESPONSIBILITY: Blocks unauthorized access and provides a seamless visual transition while verifying session tokens.
// DATA FLOW: React Router -> ProtectedRoute -> wait for useAuth -> Skeleton UI -> Navigate OR Outlet.

// IMPORT: 'Navigate', 'Outlet' from 'react-router-dom'.
    // react-router-dom - a library for implementing dynamic, client-side routing in React web applications, enables the creation of single-page applications (SPAs) that can navigate between different views or components without requiring a full page reload
        // Navigate - declarative navigation (redirection) within application , when rendered it automatically changes the current location (URL) to the path specified in its to prop. This component accepts several props to control the navigation behavior
            // to (required): The destination path or URL you want to navigate to.
            // replace (optional): A boolean prop - new location will replace the current entry in the browser's history stack, preventing the user from being able to use the "Back" button
            // state (optional): object to pass data to the destination route, which can be accessed using the useLocation hook in the target component. 
        // Outlet - an invisible marker that tells React Router where to dynamically insert the content of a child route,  primarily used when you want a parent component to remain static while only a specific section of the UI changes based on the current URL
import type { ReactElement } from 'react';
import {Navigate, Outlet} from "react-router-dom";
// IMPORT: 'useAuth' from '../hooks/useAuth'.
import {useAuth} from "../../hooks/useAuth";
// IMPORT: A Skeleton component or CSS module.
import styles from './ProtectedRoute.module.css';


const ProtectedRoute = (): ReactElement => {
/**
 * COMPONENT: ProtectedRoute
 * 1. AUTH STATE: Destructure '{ isAuthenticated, loading }' from 'useAuth()'.
 */
    const {isAuthenticated, loading} = useAuth();


/**
 * RENDER: The Gatekeeper Logic
 * 1. THE SKELETON TRAP: If 'loading' is true, return a Skeleton UI layout (e.g., '<div className="skeleton-container">...</div>').
 * WHY: When the user refreshes the page, the browser takes ~100ms to parse localStorage. If you don't show a skeleton, the UI jumps erratically. A skeleton maintains the layout dimensions while the auth check finishes.
 * 2. THE BOUNCER: If '!loading && !isAuthenticated', return '<Navigate to="/login" replace />'.
 * 3. THE VIP ACCESS: If '!loading && isAuthenticated', return '<Outlet />'.
 */
    if (loading) {
        return (
            <div className={styles.skeletonWrapper}>
                <div className={styles.skeletonLine} style={{ width: '80%' }}> </div>
                <div className={styles.skeletonLine}> </div>
                <div className={styles.skeletonLine} style={{ width: '60%' }}> </div>
            </div>
        );
    }

    if (!loading && !isAuthenticated) {
        return (
            <Navigate to="/login" replace/>
        )
    }

    return <Outlet/>;
};

export default ProtectedRoute;