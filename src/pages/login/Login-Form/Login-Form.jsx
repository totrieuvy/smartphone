import React, { useState } from "react";
import * as Components from "./Components";
import { validateCredentials, createAccount } from "./AccountService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ termsRef }) => {
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For debouncing

  const handleSignIn = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    if (!username || !password) {
      toast.error("Username and password are required.", {
        toastId: "login-error",
        autoClose: 2000,
      });
      setIsSubmitting(false); // Re-enable button after error
      return;
    }

    try {
      const user = await validateCredentials(username, password);
      if (user) {
        toast.success("Sign in successful!", { autoClose: 1500, toastId: "login-success" });
        localStorage.setItem("account", JSON.stringify({ user }));
        
        // Clear username and password to prevent re-use on revisiting
        setUsername("");
        setPassword("");

        setTimeout(() => {
          setIsSubmitting(false); // Reset submitting state for future logins
          switch (user.role) {
            case "manager":
              window.location.href = "/manager";
              break;
            case "admin":
              window.location.href = "/admin";
              break;
            case "staff":
              window.location.href = "/staff";
              break;
            default:
              toast.error("Access denied.", { autoClose: 2000, toastId: "role-error" });
              break;
          }
        }, 2000);
      } else {
        toast.error("Invalid username or password.", { autoClose: 2000, toastId: "invalid-credentials" });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { autoClose: 2000, toastId: "sign-in-error" });
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the inputs", { toastId: "signup-input-error" });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 1000, toastId: "password-match-error" });
      setIsSubmitting(false);
      return;
    }

    if (!isChecked) {
      toast.error("You must agree to the terms of service", { toastId: "terms-checkbox-error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await createAccount(username, email, password);
      if (user) {
        toast.success("Sign up successful", { toastId: "signup-success" });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { toastId: "signup-error" });
    }
    setIsSubmitting(false);
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    termsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="login-container">
        <Components.Container>
          <Components.SignUpContainer $signinIn={signIn}>
            <Components.Form>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Components.Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />}
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      type="button"
                      onClick={handleTermsClick}
                      style={{ color: "#ff416c", textDecoration: "underline" }}
                    >
                      terms of service
                    </Link>
                  </>
                }
              />
              <Components.Button type="button" onClick={handleSignUp}>
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer $signinIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Components.Anchor href="#">Forgot your password?</Components.Anchor>
              <Components.Button type="button" onClick={handleSignIn}>
                Sign in
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer $signinIn={signIn}>
            <Components.Overlay $signinIn={signIn}>
              <Components.LeftOverlayPanel $signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(true)}>Sign In</Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel $signinIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>Enter Your personal details and start journey with us</Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(false)}>Sign Up</Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </Components.Container>
      </div>
    </>
  );
};

export default Login;
