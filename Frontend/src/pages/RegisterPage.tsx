// RESPONSIBILITY: Captures new user details, enforces password confirmation, creates the account, and navigates.
// DATA FLOW: Form Input -> Local State (Validation) -> useAuth().register() -> React Router Navigation.

// IMPORT: React, useNavigate, useAuth.
import {type ReactElement, type FormEvent ,useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

/**
 * COMPONENT: RegisterPage
 * 1. SETUP: Initialize navigate, destructure '{ register }' from useAuth().
 * 2. LOCAL STATE: Initialize 'email', 'password', 'confirmPassword', and 'error'.
 */
const RegisterPage = (): ReactElement => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
/**
 * HANDLER: handleSubmit
 * 1. VALIDATION GATE: If 'password !== confirmPassword', set error to "Passwords do not match" and return early.
 * 2. EXECUTE: Try/catch block. Await 'register(email, password)'.
 * 3. REDIRECT: Call 'navigate("/")' on success.
 * 4. ERROR: Catch and display backend errors (e.g., "Email already in use").
 */
    

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => { 
        event.preventDefault() // Without this, the second the user clicks "Register", the browser will refresh the page, wiping out all the state and cancel the network request
        setError('');


        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return; // Exit the function instantly.
        }

        setIsSubmitting(true);

        try {
            await register(email, password);
            navigate("/")
        }
        catch (error: any) {
            setError(error.response?.data?.message || "Email already in use")
        } finally {
            setIsSubmitting(false); // Unlock the UI
        }
    }
/**
 * RENDER: JSX Layout
 * 1. FORM: Controlled inputs for email, password, and confirmPassword.
 * 2. ERROR/SUBMIT: Display errors and the submit button.
 * 3. REDIRECT LINK: <Link to="/login"> for existing users.
 */

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* EMAIL INPUT */}
                <div>
                    <input 
                        type="email"
                        value={email}
                        placeholder="Email Address"
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
                        onChange={(event) => setPassword(event.target.value)}

                        required
                    />
                </div>
                    
                

                {/* CONFIRM PASSWORD INPUT */}
                <div>
                    <input 
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(event) => setConfirmPassword(event.target.value)}

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
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                <p>
                    Already Have an Account?
                    <Link 
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage;

