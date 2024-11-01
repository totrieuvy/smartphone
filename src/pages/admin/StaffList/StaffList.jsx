import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit } from 'react-icons/fa';
import { Pagination, InputGroup, FormControl, Dropdown, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import StaffDetailModal from '../AdditionalSections/StaffDetailModal/StaffDetailModal';
import axios from 'axios';
import './StaffList.css';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBanUnbanModal, setShowBanUnbanModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState(''); // New state for editable email
  const [reason, setReason] = useState('');
  const itemsPerPage = 12;

  useEffect(() => {
    axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (userId) => {
    navigate(`/admin/editstaff/${userId}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users
    .filter(user => user.role === 'staff')
    .filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatus = (status) => {
    return status === true ? 'success' : 'danger';
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleShowBanUnbanModal = (user) => {
    setSelectedUser(user);
    setEmail(user.email); // Set initial email in state when showing modal
    setShowBanUnbanModal(true);
  };

  const handleCloseBanUnbanModal = () => {
    setShowBanUnbanModal(false);
    setSelectedUser(null);
    setReason('');
  };

  const handleBanUnban = () => {
    // Update the user's status in your backend
    axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${selectedUser.id}`, {
      status: !selectedUser.status,
    })
      .then(() => {
        toast.success(`${selectedUser.status ? 'Banned' : 'Unbanned'} successfully`);
        setUsers(users.map(user => user.id === selectedUser.id ? { ...user, status: !user.status } : user));

        console.log(email);

        // Send email notification
        emailjs.send('service_8ee1x3i', 'template_qacetss', {
          user_email: email,
          user_name: selectedUser.name,
          message: reason,
        }, 'pdYoew3qMLB5A3txi')
        .then(() => {
          toast.success('Notification sent successfully');
        })
          .catch((error) => {
            console.error('Failed to send email', error); // Log the error correctly
            toast.error('Failed to send email. Please try again.');
          });

        handleCloseBanUnbanModal();
      })
      .catch(() => {
        toast.error('Failed to update user status');
      });
  };

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <PageTitle page="Staff List" />
        <Button
          variant="primary"
          onClick={() => navigate('/admin/addstaff')}
          className="add-staff-button"
        >
          Add Staff
        </Button>
      </div>

      <div className="user-table-container">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for staff..."
            aria-label="Search"
            onChange={handleSearch}
          />
          <InputGroup.Text>{`Showing ${filteredUsers.length} staff(s)`}</InputGroup.Text>
        </InputGroup>

        <table className='table table-borderless datatable'>
          <thead className='table-light'>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Status</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <th scope='row'>
                  <a href="#" className="custom-link">{user.id}</a>
                </th>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge bg-${handleStatus(user.status)}`}>
                    {user.status ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="d-flex align-items-center">
                  <FaEye
                    className="custom-icon me-3 text-dark"
                    onClick={() => handleShowModal(user)}
                    style={{ cursor: 'pointer' }}
                    title="View Detail"
                  />
                  <FaEdit
                    className="custom-icon me-2 text-dark"
                    onClick={() => handleEditClick(user.id)}
                    style={{ cursor: 'pointer' }}
                    title="Edit"
                  />
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="custom-button three-dots p-0 text-decoration-none text-dark">
                      &#8942;
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShowBanUnbanModal(user)}>
                        {user.status ? 'Ban' : 'Unban'}
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <StaffDetailModal show={showModal} onClose={handleCloseModal} user={selectedUser} />

        {/* Ban/Unban Modal */}
        <Modal show={showBanUnbanModal} onHide={handleCloseBanUnbanModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser?.status ? 'Ban' : 'Unban'} Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  defaultValue={selectedUser?.name || ''} // Fallback to an empty string if selectedUser is null
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  defaultValue={selectedUser?.email || ''} // Fallback to an empty string if selectedUser is null
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formReason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBanUnbanModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleBanUnban}>
              {selectedUser?.status ? 'Ban' : 'Unban'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default UserList;
