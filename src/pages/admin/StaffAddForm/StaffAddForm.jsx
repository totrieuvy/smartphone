import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import axios from 'axios';
import './StaffAddForm.css';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';

const StaffAddForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    email: '',
    name: '',
    role: '',
    status: true,
    create_date: '',
    salary: '',
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://6692a166346eeafcf46da14d.mockapi.io/account', formData);
      alert('Staff added successfully!');
      navigate('/admin/adminstafflist');
    } catch (error) {
      alert('Error adding staff. Please try again.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/adminstafflist');
  };

  return (
    <main id="main" className="main">
      <PageTitle page="Add a Staff" />
      <form onSubmit={handleSubmit} className="staff-form container mt-4 p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input type="number" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3 password-input-container">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="create_date" className="form-label">Create Date</label>
              <input type="date" className="form-control" id="create_date" name="create_date" value={formData.create_date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value={true}>Active</option>
                <option value={false}>Banned</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button type="button" onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
          <button type="submit" className="btn btn-primary">Add Staff</button>
        </div>
      </form>
    </main>
  );
};

export default StaffAddForm;
