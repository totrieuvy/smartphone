import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import "./StaffEditForm.css";
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';


const StaffEditForm = () => {
  const { userId } = useParams(); 
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

  useEffect(() => {
    axios.get(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`)
      .then(response => {
        const fetchedData = response.data;
        let formattedDate = fetchedData.create_date;
        
        // Assuming the initial format is 'yyyy-dd-MM' and needs to be 'yyyy-MM-dd'
        if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
          const [year, month, day] = formattedDate.split("-");
          formattedDate = `${year}-${month}-${day}`;
        }
        
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
  
    // Update user data on the backend
    axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${userId}`, formData)
      .then(() => {
        toast.success('User data updated successfully');
        navigate('/admin/adminstafflist'); // Redirect after saving
  
        // Optionally, send an email notification for the update
        emailjs.send('service_8ee1x3i', 'template_qacetss', {
          user_email: formData.email,
          user_name: formData.username,
          role: formData.role,
          salary: formData.salary,
          phone: formData.phone,
          create_date: formData.create_date
        }, 'pdYoew3qMLB5A3txi')
          .then(() => {
            toast.success('Update notification sent successfully');
          })
          .catch((error) => {
            console.error('Failed to send email', error);
            toast.error('Failed to send email. Please try again.');
          });
      })
      .catch(error => {
        console.error("There was an error updating the user data!", error);
        toast.error('Failed to update user data');
      });
  };
  

  const handleCancel = () => {
    navigate('/admin/adminstafflist'); 
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
                value={formData.username || ''}
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
                value={formData.email || ''}
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
                value={formData.role || ''}
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
                value={formData.salary || ''}
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
                value={formData.phone || ''}
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
                value={formData.password || ''}
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
                value={formData.create_date || ''}
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
