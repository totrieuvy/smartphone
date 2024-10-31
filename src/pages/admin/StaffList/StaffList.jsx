import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit } from 'react-icons/fa'; // Import view and edit icons
import { Pagination, InputGroup, FormControl, Dropdown, Button } from 'react-bootstrap';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import StaffDetailModal from '../AdditionalSections/StaffDetailModal/StaffDetailModal'
import axios from 'axios';
import './StaffList.css';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
                    onClick={() => handleEditClick(user.id)} // Trigger navigation on click
                    style={{ cursor: 'pointer' }}
                    title="Edit"
                  />
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="custom-button three-dots p-0 text-decoration-none text-dark">
                      &#8942;
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Change Status</Dropdown.Item>
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
      </div>
    </main>
  );
};

export default UserList;
