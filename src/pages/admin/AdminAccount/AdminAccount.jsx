import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAccount.css';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Admin', // Setting default role as Admin
    phone: '',
    createDate: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Fetch admin data on component mount
  useEffect(() => {
    axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account/1') // Assuming admin ID is 1
      .then(response => {
        setFormData(prevData => ({
          ...prevData,
          ...response.data // Merge existing defaults with fetched data
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the admin data!", error);
      });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <main id="main" className="main">
      <PageTitle page="Your Account" />
      <form className="admin-account-form p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username || ''}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email || ''}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={formData.role || ''}
                readOnly
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
                value={formData.phone || ''}
                readOnly
              />
            </div>
            <div className="mb-3 password-input-container">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password || ''}
                readOnly
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="mb-3">
              <label htmlFor="createDate" className="form-label">Create Date</label>
              <input
                type="date"
                className="form-control"
                id="createDate"
                name="createDate"
                value={formData.createDate || ''}
                readOnly
              />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AdminAccount;
