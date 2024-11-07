import React, { useState } from "react"; // Import useState here
import * as Components from "./Components";
import { validateCredentials, createAccount, checkEmailExists } from "./AccountService";
import { ToastContainer, toast } from "react-toastify";
import { FaGooglePlusG, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ termsRef }) => {
  const [signIn, setSignIn] = useState(true); // Set up state with setSignIn as the setter
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State for the checkbox

  const handleSignIn = async () => {
    console.log("Sign-in button clicked");

    if (!username || !password) {
      console.log("Username and password are required");
      toast.error("Username and password are required.", {
        autoClose: 2000,
      });
      return;
    }

    try {
      console.log("Validating credentials...");
      const user = await validateCredentials(username, password);

      if (user) {
        console.log("Validation successful");
        toast.success("Sign in successful!", {
          autoClose: 1500,
        });

        localStorage.setItem("account", JSON.stringify({ user }));

        // Delay the redirection to allow the Toastify notification to appear
        setTimeout(() => {
          console.log("Redirecting based on role...");
          switch (user.role) {
            case "manager":
              console.log("Redirecting to /manager");
              window.location.href = "/manager";
              break;
            case "admin":
              console.log("Redirecting to /admin");
              window.location.href = "/admin";
              break;
            case "staff":
              console.log("Redirecting to /staff");
              window.location.href = "/staff";
              break;
            case "admin":
              console.log("Redirecting to /admin");
              window.location.href = "/admin";
              break;
            default:
              console.log("No specific path for this role");
              toast.error("Access denied.", {
                autoClose: 2000,
              });
              break;
          }
        }, 2000);
      } else {
        console.log("Invalid username or password");
        toast.error("Invalid username or password.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log("An error occurred during sign-in:", error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  const handleSignUp = async () => {
    // Check if any input fields are empty
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the inputs");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Incorrect email format");
      return;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      toast.error("Password is not the same", {
        autoClose: 1000,
      });

      return;
    }

    // Check if terms of service checkbox is checked
    if (!isChecked) {
      toast.error("You must agree to the terms of service");
      return;
    }

    try {
      console.log("Attempting to create account in the API");

      // Create account in the API
      const user = await createAccount(username, email, password);

      if (user) {
        toast.success("Sign up successful");
        // Clear form fields after successful sign-up
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    termsRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to Terms of Service
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

              {/* Social Media Icons Row */}
              <Components.IconRow>
                <Components.SocialIcon>
                  <FaGooglePlusG />
                </Components.SocialIcon>
                <Components.SocialIcon>
                  <FaFacebook />
                </Components.SocialIcon>
                <Components.SocialIcon>
                  <FaGithub />
                </Components.SocialIcon>
                <Components.SocialIcon>
                  <FaLinkedinIn />
                </Components.SocialIcon>
              </Components.IconRow>

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

          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Components.Container>
      </div>
    </>
  );
};

export default Login;
