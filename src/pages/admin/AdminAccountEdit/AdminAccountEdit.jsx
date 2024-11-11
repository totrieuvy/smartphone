import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './AdminAccountEdit.css';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';

const AdminAccountEdit = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account/1')
            .then(response => {
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    phone: response.data.phone,
                    password: response.data.password,
                });
            })
            .catch(error => {
                console.error("Error fetching account data for editing!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleCancel = () => {
        navigate('/admin/adminaccount'); // Adjust the path to your actual account page route
    };

    const handleSaveChanges = () => {
        axios.put('https://6692a166346eeafcf46da14d.mockapi.io/account/1', formData)
            .then(() => {
                alert("Account updated successfully!");
            })
            .catch(error => {
                console.error("Error updating account!", error);
            });
    };

    return (
        <main id="main" className="main">
            <PageTitle page="Edit Account" />
            <form className="staff-form admin-account-edit-form p-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3 password-input-container">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button type="button" className="btn btn-secondary mt-3" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary mt-3 ms-2" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </div>
            </form>
        </main>
    );
};

export default AdminAccountEdit;
