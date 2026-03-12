// RESPONSIBILITY: Provides global site navigation without triggering hard browser reloads.
// DATA FLOW: useAuth (State) -> Navbar -> User Click -> React Router <Link> -> Component Swap.

import { type ReactElement } from 'react';
// IMPORT: 'Link' and 'useNavigate' from 'react-router-dom'.
    // Link - handles navigation entirely on the client side using JavaScript, 
    //      - Prevents full-page reloads ,  preserves the application's state and avoids unnecessary server requests for the same page
    // useNavigate - enables programmatic navigation between different routes within a React application , Accepts Arguments like navigate('/path/to/go'),  navigate(-1): Navigates one step back, navigate(1): Navigates one step forward
    //             - When you call useNavigate() inside a functional component, it returns a navigate function, which you then use to change the route

import {Link, useNavigate} from "react-router-dom";
// IMPORT: 'useAuth' from '../hooks/useAuth'.
import {useAuth} from "../hooks/useAuth";



/**
 * COMPONENT: Navbar
 * 1. AUTH STATE: Destructure '{ isAuthenticated, logout, user }' from 'useAuth()'.
 * 2. ROUTING: Initialize 'const navigate = useNavigate()'.
 */
const Navbar = (): ReactElement => {

    const { isAuthenticated, logout, user } = useAuth();
/**
 * HANDLER: handleLogout
 * 1. LOGIC: Call 'logout()', then 'navigate("/login")'.
 */
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login"); 
    };




/**
 * RENDER: JSX Layout
 * 1. THE SPA RULE: Use '<Link to="/...">' for ALL internal navigation. NEVER use '<a href="/...">'.
 * WHY: An <a> tag makes the browser request a brand new HTML document from the server, wiping out your entire React state (Auth Context, Search Results, everything). <Link> intercepts the click and instantly swaps the JS component in memory.
 * 2. CONDITIONAL RENDERING (Logged In): Render Favorites <Link>, user email, and Logout button.
 * 3. CONDITIONAL RENDERING (Logged Out): Render Login <Link> and Register <Link>.
 */
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    {/* LOGGED IN VIEW*/}
                    <Link to="/favorites">My Favorites</Link>
                    <span>{user?.email}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    {/* LOGGED OUT VIEW*/}
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    
    )
};

export default Navbar;