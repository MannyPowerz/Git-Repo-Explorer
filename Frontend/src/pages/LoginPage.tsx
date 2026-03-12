// RESPONSIBILITY: Captures user credentials, triggers global authentication, and navigates upon success.
// DATA FLOW: Form Input -> Local State -> useAuth().login() -> React Router Navigation.

// IMPORT: React (useState).
import {type ReactElement, type FormEvent ,useState} from "react";
// IMPORT: useNavigate from 'react-router-dom'.
import {Link, useNavigate} from "react-router-dom";
// IMPORT: useAuth from '../hooks/useAuth'.
import {useAuth} from "../hooks/useAuth";

/**
 * COMPONENT: LoginPage
 * 1. ROUTING: Initialize 'navigate = useNavigate()'.
 * 2. AUTH STATE: Destructure '{ login }' from 'useAuth()'.
 * 3. LOCAL STATE: Initialize 'email', 'password', and 'error' strings.
 */

const LoginPage = (): ReactElement => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // As the user types "M," then "Ma," then "Man...", React needs to remember those letters and re-render the input box to show them. useState is the only way to do this.
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
/**
 * HANDLER: handleSubmit
 * 1. PREVENT DEFAULT: Stop browser reload.
 * 2. EXECUTE: Wrap in try/catch. Await 'login(email, password)'.
 * 3. SUCCESS REDIRECT: If successful, call 'navigate("/")' to send the user to the HomePage.
 * 4. ERROR HANDLING: In the catch block, set the local 'error' state to display "Invalid credentials".
 */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => { 
        // prevent the default browser action that causes a page reload 
        event.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password)
            navigate("/")
            
        } 
        catch (error: any) {
            setError(error.response?.data?.message || "Login failed. Please try again.")
        } finally {
            setIsSubmitting(false); // Unlock the UI
        }
    }


/**
 * RENDER: JSX Layout
 * 1. FORM: Render a <form onSubmit={handleSubmit}>.
 * 2. INPUTS: Controlled inputs for email and password (value={email} onChange={(e) => setEmail(e.target.value)}).
 * 3. ERROR: Conditionally render the error string if it exists.
 * 4. SUBMIT: Render the submit <button>.
 * 5. REDIRECT LINK: Render a React Router <Link to="/register"> linking to the registration page.
 */
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {/* EMAIL INPUT */}
                <div>
                    <input 
                        type="email"
                        value={email}
                        placeholder="Email Address"
                        autoComplete="email"
                        onChange={(event) => setEmail(event.target.value)}

                        required
                    />
                </div>

                {/* PASSWORD INPUT */}
                <div>
                    <input 
                        type="password"
                        value={password}
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}

                        required
                    />
                </div>
                 

                    {error && (
                        <span 
                            className="error"
                            style={{ color: 'red' }}
                        >
                            {error}
                        </span>

                    )}
                

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p>
                    Don't have an account? 
                    <Link 
                        to="/register"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )

};

export default LoginPage;