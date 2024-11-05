// AccountService.jsx
import axios from 'axios';

const API_URL = "https://6678e6e40bd452505620352b.mockapi.io/Accounts";

export const fetchAccounts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
    }
};

// Function to validate credentials and return user data including role
export const validateCredentials = async (username, password) => {
    try {
        const accounts = await fetchAccounts();
        return accounts.find(account => account.username === username && account.password === password);
    } catch (error) {
        console.error("Error validating credentials:", error);
        throw error;
    }
};

// Function to check if email already exists
export const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(API_URL, { params: { email } });
        return response.data.some(account => account.email === email); // Returns true if email exists
    } catch (error) {
        console.error("Error checking email:", error);
        throw error;
    }
};

// Function to create a new user account
export const createAccount = async (username, email, password) => {
    try {
        // Check if email exists before creating account
        // const emailExists = await checkEmailExists(email);
        // if (emailExists) {
        //     return { error: "Email already exists" }; // Indicate email already exists
        // }

        const response = await axios.post(API_URL, {
            username,
            email,
            password,
            role: 'customer',
            status: true,
            created_date: new Date().toISOString()
        });

        return response.data;
    } catch (error) {
        console.error("Error in createAccount API request:", error);
        throw error;
    }
};
