// RESPONSIBILITY: The Master Router. Maps URLs to specific React Components and enforces layout structure.
// DATA FLOW: Browser URL -> BrowserRouter -> Route Matching -> Component Swap.
import type { ReactElement } from 'react';
// IMPORT: BrowserRouter, Routes, Route from 'react-router-dom'.
    // react-router-dom is the official library for implementing client-side routing in React web applications. It enables navigation between different components or "pages" within a single-page application (SPA) without requiring a full page reload
        // BrowserRouter - wraps entire application using "HTML5 History API" to manage the URL and history stack (records user actions or visited states within an application, allowing for backward/forward navigation or undo/redo functionality,  sequence of visited URL)
        // Routes - contains all idividual route fdefintriaons making sure one matchinbg route is rendered at a time 
        // Route - when URL matches a path which is defined it is mapped to a certain React element or component to show up on display
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORT: Navbar from './components/Navbar'.
    // Navbar renders on every page as App.tsx controls the entire layout.
import Navbar from "./components/Navbar";
// IMPORT: ProtectedRoute from './components/ProtectedRoute'.
    // ProtectedRoute acts as a wrapper around routes that require authentication Any child routes inside it must pass the auth check before rendering. You import it here because this is where you define which routes are public and which are protected
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// IMPORT: HomePage, LoginPage, RegisterPage, FavoritesPage from './pages/...'.
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";



/**
 * COMPONENT: App
 * 1. SIGNATURE: Export default functional component.
 */
    // Signiture is a contract  defining what a function accepts and what it returns
        // Example - { title } on the left side of the colon is pure JavaScript. It means "reach into the props object and yank out the title variable
        // Example - { title: string } on the right side of the colon is pure TypeScript. It means "The parameter coming in MUST be an object, and that object MUST contain a key called title which holds a string
            // The Variable (JS): ({ title })
            // The Type (TS): : { title: string }
            // extracting the variable AND defining the strict rules for the object it came from simultaneously. That is why the word title appears twice. The first one is the physical variable you are going to use. The second one is the rulebook.
        // Cleaner Method - extract the TypeScript rulebook into a clean interface above the component
const App =  ( ): ReactElement => {
/**
 * RENDER: The Routing Tree
 * 1. WRAPPER: Return a <BrowserRouter> as the absolute root of this component.
 * WHY: React Router needs to hijack the browser's URL History API. If you render a <Link> anywhere outside of this BrowserRouter, your app will fatally crash.
 * * 2. PERSISTENT UI: Render <Navbar /> immediately inside the router, but OUTSIDE the <Routes> block.
 * WHY: The <Routes> block is where components get destroyed and rebuilt when the URL changes. By putting the Navbar outside of it, the Navbar persists globally across every single page without re-rendering.
 *      Think of the <BrowserRouter> as a physical television set.
            The <Navbar /> is the plastic frame around the TV.
            The <Routes> block is the actual glass screen.
            The Pages (HomePage, LoginPage) are the different channels.
 * * 3. ROUTES BLOCK: Open a <Routes> component. This is the actual switchboard.
 * * 4. PUBLIC ROUTES: Define your standard, unrestricted routes:
 * - <Route path="/" element={<HomePage />} />
 * - <Route path="/login" element={<LoginPage />} />
 * - <Route path="/register" element={<RegisterPage />} />
 * * 5. PROTECTED ROUTES (The v6 Outlet Pattern):
 * - Open a wrapper route: <Route element={<ProtectedRoute />}>
 * - Inside that wrapper, nest your private page: <Route path="/favorites" element={<FavoritesPage />} />
 * - Close the wrapper route.
 * WHY NESTED?: If you ever add a "Settings" page or a "Profile" page, you just drop them inside this exact same wrapper block, and they are instantly secured.
 */
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Standard, unrestricted routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* PROTECTED ROUTES */}
                {/* ProtectedRoute becomes a "pathless layout route." This means it wraps its children with logic (like authentication checks) without adding any segments to the URL */}
                <Route  element={<ProtectedRoute/>} >
                    {/* When you see it used with two tags (<Route> ... </Route>), it is acting as a wrapper (parent). When you see it with one tag (<Route />), it is a leaf (child). The only reason to use the two-tag version is to wrap other routes */}
                    <Route path="/favorites" element={<FavoritesPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;