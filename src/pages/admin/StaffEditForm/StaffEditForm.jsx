import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./StaffEditForm.css";
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StaffEditForm = () => {
  const { userId } = useParams(); // Get userId from route params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    salary: '',
    phone: '',
    password: '',
    create_date: '',
  });

  // Fetch staff data on component mount
  useEffect(() => {
    axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`)
      .then(response => {
        const fetchedData = response.data;
  
        // Format the create_date if it is in "yyyy-dd-MM" format
        let formattedDate = fetchedData.create_date;
        if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
          const [year, day, month] = formattedDate.split("-");
          formattedDate = `${year}-${month}-${day}`;
        }
  
        // Update the form data with the formatted date
        setFormData(prevData => ({
          ...prevData,
          ...fetchedData,
          create_date: formattedDate
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the staff data!", error);
      });
  }, [userId]);
  

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`, formData)
      .then(() => {
        navigate('/admin/adminstafflist'); // Redirect after saving
      })
      .catch(error => {
        console.error("There was an error updating the staff data!", error);
      });
  };

  const handleCancel = () => {
    navigate('/admin/adminstafflist'); // Redirect back to the staff list page
  };

  return (
    <main id="main" className="main">
      <PageTitle page="Edit Staff" />
      <form onSubmit={handleSubmit} className="edit-staff-form p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username || ''} // Ensure controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email || ''} // Ensure controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={formData.role || ''} // Ensure controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                name="salary"
                value={formData.salary || ''} // Ensure controlled input
                onChange={handleChange}
                required
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
                value={formData.phone || ''} // Ensure controlled input
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 password-input-container">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password || ''} // Ensure controlled input
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
              <input
                type="date"
                className="form-control"
                id="create_date"
                name="create_date"
                value={formData.create_date || ''} // Ensure controlled input
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Edit Staff
          </button>
        </div>
      </form>
    </main>
  );
};

export default StaffEditForm;
