// RESPONSIBILITY: The Master Router. Maps URLs to specific React Components and enforces layout structure.
// DATA FLOW: Browser URL -> BrowserRouter -> Route Matching -> Component Rendering.

// IMPORT: BrowserRouter, Routes, Route from 'react-router-dom'.
// IMPORT: Navbar, ProtectedRoute.
// IMPORT: HomePage, LoginPage, RegisterPage, FavoritesPage.



/**
 * COMPONENT: App
 * 1. SIGNATURE: Export default functional component.
 */

/**
 * RENDER: The Routing Tree
 * 1. WRAPPER: Wrap the entire return statement in <BrowserRouter>.
 * 2. PERSISTENT UI: Render <Navbar /> immediately inside the router, but OUTSIDE the <Routes> block. 
 * WHY: This ensures the Navbar is always glued to the top of the screen no matter what page changes below it.
 * 3. ROUTES BLOCK: Open a <Routes> component.
 * 4. PUBLIC ROUTES: Define standard routes: 
 * - <Route path="/" element={<HomePage />} />
 * - <Route path="/login" element={<LoginPage />} />
 * - <Route path="/register" element={<RegisterPage />} />
 * 5. PROTECTED ROUTES: 
 * - Render the <ProtectedRoute> wrapper. 
 * - Inside it, place <Route path="/favorites" element={<FavoritesPage />} />.
 */