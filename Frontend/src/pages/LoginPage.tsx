// RESPONSIBILITY: Captures user credentials, triggers global authentication, and navigates upon success.
// DATA FLOW: Form Input -> Local State -> useAuth().login() -> React Router Navigation.

// IMPORT: React (useState).
// IMPORT: useNavigate from 'react-router-dom'.
// IMPORT: useAuth from '../hooks/useAuth'.

/**
 * COMPONENT: LoginPage
 * 1. ROUTING: Initialize 'navigate = useNavigate()'.
 * 2. AUTH STATE: Destructure '{ login }' from 'useAuth()'.
 * 3. LOCAL STATE: Initialize 'email', 'password', and 'error' strings.
 */

/**
 * HANDLER: handleSubmit
 * 1. PREVENT DEFAULT: Stop browser reload.
 * 2. EXECUTE: Wrap in try/catch. Await 'login(email, password)'.
 * 3. SUCCESS REDIRECT: If successful, call 'navigate("/")' to send the user to the HomePage.
 * 4. ERROR HANDLING: In the catch block, set the local 'error' state to display "Invalid credentials".
 */

/**
 * RENDER: JSX Layout
 * 1. FORM: Render a <form onSubmit={handleSubmit}>.
 * 2. INPUTS: Controlled inputs for email and password (value={email} onChange={(e) => setEmail(e.target.value)}).
 * 3. ERROR: Conditionally render the error string if it exists.
 * 4. SUBMIT: Render the submit <button>.
 * 5. REDIRECT LINK: Render a React Router <Link to="/register"> linking to the registration page.
 */