import React from "react";
import * as Components from './Components';
import { validateCredentials } from './AccountService';
import { ToastContainer, toast } from 'react-toastify';
import { FaGooglePlusG, FaFacebook, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

import "./Login.css";

const Login = () => {
    const [signIn, toggle] = React.useState(true);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignIn = async () => {
        console.log("Sign-in button clicked");  // Log button click

        // Check for required fields
        if (!username || !password) {
            console.log("Username and password are required");  // Log missing fields
            toast.error("Username and password are required.", {
                autoClose: 2000, // 2-second duration for the error message
            });
            return;
        }

        try {
            console.log("Validating credentials...");  // Log validation start
            const user = await validateCredentials(username, password);

            if (user) {
                console.log("Validation successful");  // Log successful validation
                toast.success("Sign in successful!", {
                    autoClose: 1500, // 2-second duration for the success message
                });

                // Delay the redirection to allow the Toastify notification to appear
                setTimeout(() => {
                    // Redirect based on specific credentials
                    if (username === "manager" && password === "manager") {
                        console.log("Redirecting to /manager");  // Log redirection
                        window.location.href = "/manager";
                    } else if (username === "admin" && password === "admin") {
                        console.log("Redirecting to /admin");  // Log redirection
                        window.location.href = "/admin";
                    } else {
                        console.log("Invalid credentials for specific paths");  // Log unmatched credentials
                        toast.error("Invalid credentials.", {
                            autoClose: 2000,
                        });
                    }
                }, 2000);  // 2-second delay for the Toastify notification
            } else {
                console.log("Invalid username or password");  // Log invalid credentials
                toast.error("Invalid username or password.", {
                    autoClose: 2000, // 2-second duration for the error message
                });
            }
        } catch (error) {
            console.log("An error occurred during sign-in:", error);  // Log error details
            toast.error("An error occurred. Please try again.", {
                autoClose: 2000, // 2-second duration for the error message
            });
        }
    };



    return (
        <>
            <div className="login-container">

                <Components.Container>
                    <Components.SignUpContainer $signinIn={signIn}>
                        <Components.Form>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input type='text' placeholder='Username' />
                            <Components.Input type='email' placeholder='Email' />
                            <Components.Input type='email' placeholder='Confirm Email' />
                            <Components.Input type='password' placeholder='Password' />
                            <Components.Input type='password' placeholder='Confirm Password' />
                            <FormControlLabel
                                required
                                control={<Checkbox />}
                                label={
                                    <>
                                        I agree to the <Link to="/terms" style={{ color: '#ff416c', textDecoration: 'underline' }}>terms of service</Link>
                                    </>
                                }
                            />
                            <Components.Button>Sign Up</Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer $signinIn={signIn}>
                        <Components.Form>
                            <Components.Title>Sign in</Components.Title>

                            {/* Social Media Icons Row */}
                            <Components.IconRow>
                                <Components.SocialIcon><FaGooglePlusG /></Components.SocialIcon>
                                <Components.SocialIcon><FaFacebook /></Components.SocialIcon>
                                <Components.SocialIcon><FaGithub /></Components.SocialIcon>
                                <Components.SocialIcon><FaLinkedinIn /></Components.SocialIcon>
                            </Components.IconRow>

                            <Components.Input
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Components.Input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                            <Components.Button type="button" onClick={handleSignIn}>Sign in</Components.Button>
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer $signinIn={signIn}>
                        <Components.Overlay $signinIn={signIn}>
                            <Components.LeftOverlayPanel $signinIn={signIn}>
                                <Components.Title>Welcome Back!</Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us please login with your personal info
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(true)}>
                                    Sign In
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel $signinIn={signIn}>
                                <Components.Title>Hello, Friend!</Components.Title>
                                <Components.Paragraph>
                                    Enter Your personal details and start journey with us
                                </Components.Paragraph>
                                <Components.GhostButton onClick={() => toggle(false)}>
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>

                    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
                </Components.Container>
            </div>
        </>

    );
};

export default Login;
