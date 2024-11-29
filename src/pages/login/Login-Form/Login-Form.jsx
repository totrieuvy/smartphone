import React, { useState } from "react";
import * as Components from "./Components";
import { validateCredentials, createAccount } from "./AccountService";
import Swal from "sweetalert2";  // Import SweetAlert2
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username and password are required.",
        timer: 2000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await validateCredentials(username, password);
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Sign in successful!",
          timer: 1500,
        });
        localStorage.setItem("account", JSON.stringify({ user }));

        setUsername("");
        setPassword("");

        setTimeout(() => {
          setIsSubmitting(false);
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
            case "customer":
              window.location.href = "/";
              break;
            default:
              Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You don't have permission to access this page.",
                timer: 2000,
              });
              break;
          }
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Invalid username or password.",
          timer: 2000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
        timer: 2000,
      });
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Check if all fields are filled out
    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all the inputs.",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
        timer: 1000,
      });
      setIsSubmitting(false);
      return;
    }

    // Check if the terms are agreed to
    if (!isChecked) {
      Swal.fire({
        icon: "error",
        title: "Agreement Error",
        text: "You must agree to the terms of service.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await createAccount(username, email, password);
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Sign Up Successful",
          timer: 1500,
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
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
        </Components.Container>
      </div>
    </> 
  );
};

export default Login;