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

// Function to validate credentials
export const validateCredentials = async (username, password) => {
    const accounts = await fetchAccounts();
    return accounts.find(account => account.username === username && account.password === password);
};
