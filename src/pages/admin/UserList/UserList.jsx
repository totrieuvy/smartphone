import React, { useState, useEffect } from 'react';
import { Pagination, InputGroup, FormControl, Dropdown, Button } from 'react-bootstrap';
import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
    .filter(user => user.role === 'user')
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
          <InputGroup.Text>{`Showing ${filteredUsers.length} users(s)`}</InputGroup.Text>
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
                <td className="d-flex align-items-center" style={{ marginTop: '-4px' }}>
                  <Button variant="link" className="custom-button me-2 text-decoration-none text-dark">View Detail</Button>
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
      </div>
    </main>
  );
};

export default UserList;
