import React, { useState, useEffect } from 'react';
import { Pagination, InputGroup, FormControl, Dropdown, Button, Modal, Form } from 'react-bootstrap';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import UserDetailModal from '../AdditionalSections/UserDetailModal/UserDetailModal';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBanUnbanModal, setShowBanUnbanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reason, setReason] = useState('');
  const itemsPerPage = 12;

  useEffect(() => {
    axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users
    .filter(user => user.role === 'customer')
    .filter(user =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
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
    setShowBanUnbanModal(true);
  };

  const handleCloseBanUnbanModal = () => {
    setShowBanUnbanModal(false);
    setSelectedUser(null);
    setReason('');
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
    setReason('');
  };

  const handleBanUnban = () => {
    const updatedStatus = !selectedUser.status;

    // Update the user's status in the backend
    axios.put(`https://6692a166346eeafcf46da14d.mockapi.io/account/${selectedUser.id}`, {
      status: updatedStatus,
    })
      .then(() => {
        toast.success(`${updatedStatus ? 'Unbanned' : 'Banned'} successfully`);
        setUsers(users.map(user =>
          user.id === selectedUser.id ? { ...user, status: updatedStatus } : user
        ));

        // Send email notification
        emailjs.send('service_8ee1x3i', 'template_qacetss', {
          user_email: selectedUser.email,
          user_name: selectedUser.name,
          message: reason,
        }, 'pdYoew3qMLB5A3txi')
          .then(() => {
            toast.success('Notification sent successfully');
          })
          .catch((error) => {
            console.error('Failed to send email', error);
            toast.error('Failed to send email. Please try again.');
          });

        handleCloseBanUnbanModal();
      })
      .catch((error) => {
        console.error('Failed to update user status:', error);
        toast.error('Failed to update user status');
      });
  };

  const handleDeleteUser = () => {
    // Remove the user from the backend
    axios.delete(`https://6692a166346eeafcf46da14d.mockapi.io/account/${selectedUser.id}`)
      .then(() => {
        toast.success('User deleted successfully');
        setUsers(users.filter(user => user.id !== selectedUser.id));

        // Optionally, send an email notification for deletion
        emailjs.send('service_8ee1x3i', 'template_qacetss', {
          user_email: selectedUser.email,
          user_name: selectedUser.name,
          message: reason,
        }, 'pdYoew3qMLB5A3txi')
          .then(() => {
            toast.success('Deletion notification sent successfully');
          })
          .catch((error) => {
            console.error('Failed to send email', error);
            toast.error('Failed to send email. Please try again.');
          });

        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error('Failed to delete user:', error);
        toast.error('Failed to delete user');
      });
  };

  return (
    <main id="main" className="main">
      <PageTitle page="User List" />

      <div className="user-table-container">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for user..."
            aria-label="Search"
            onChange={handleSearch}
          />
          <InputGroup.Text>{`Showing ${filteredUsers.length} user(s)`}</InputGroup.Text>
        </InputGroup>


        <div className="table-responsive">
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
                  <td>{user.username}</td>
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
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="link" className="custom-button three-dots p-0 text-decoration-none text-dark">
                        &#8942;
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShowBanUnbanModal(user)}>
                          {user.status ? 'Ban' : 'Unban'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowDeleteModal(user)} className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


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

        <UserDetailModal show={showModal} onClose={handleCloseModal} user={selectedUser} />

        {/* Ban/Unban Modal */}
        <Modal show={showBanUnbanModal} onHide={handleCloseBanUnbanModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser?.status ? 'Ban' : 'Unban'} User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  defaultValue={selectedUser?.username || ''}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  defaultValue={selectedUser?.email || ''}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formReason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the reason..."
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBanUnbanModal}>Close</Button>
            <Button variant="primary" onClick={handleBanUnban}>
              {selectedUser?.status ? 'Ban' : 'Unban'} User
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
            <p>Name: <strong>{selectedUser?.username}</strong></p>
            <Form.Group className="mb-3" controlId="formDeleteReason">
              <Form.Label>Reason for deletion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for deletion..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default UserList;
