// RESPONSIBILITY: Captures new user details, enforces password confirmation, creates the account, and navigates.
// DATA FLOW: Form Input -> Local State (Validation) -> useAuth().register() -> React Router Navigation.

// IMPORT: React, useNavigate, useAuth.

/**
 * COMPONENT: RegisterPage
 * 1. SETUP: Initialize navigate, destructure '{ register }' from useAuth().
 * 2. LOCAL STATE: Initialize 'email', 'password', 'confirmPassword', and 'error'.
 */

/**
 * HANDLER: handleSubmit
 * 1. VALIDATION GATE: If 'password !== confirmPassword', set error to "Passwords do not match" and return early.
 * 2. EXECUTE: Try/catch block. Await 'register(email, password)'.
 * 3. REDIRECT: Call 'navigate("/")' on success.
 * 4. ERROR: Catch and display backend errors (e.g., "Email already in use").
 */

/**
 * RENDER: JSX Layout
 * 1. FORM: Controlled inputs for email, password, and confirmPassword.
 * 2. ERROR/SUBMIT: Display errors and the submit button.
 * 3. REDIRECT LINK: <Link to="/login"> for existing users.
 */