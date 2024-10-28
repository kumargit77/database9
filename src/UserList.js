// src/components/UserList.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', email: '', phone: '', isActive: true });
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Simulating active/inactive status
        const modifiedData = data.map(user => ({
          ...user,
          isActive: Math.random() > 0.5,
        }));
        setUsers(modifiedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormVisible(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (currentUser.id) {
      // Update existing user
      setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    } else {
      // Add new user
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }

    // Reset form
    setCurrentUser({ id: '', name: '', email: '', phone: '', isActive: true });
    setFormVisible(false);
    navigate('/'); // Redirect to the same page after submission
  };

  // Handle search input
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error fetching users: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <input 
        type="text" 
        placeholder="Search by name or email" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button onClick={() => setFormVisible(true)}>Create User</button>
      {formVisible && (
        <form onSubmit={handleFormSubmit}>
          <h3>{currentUser.id ? 'Edit User' : 'Create User'}</h3>
          <div>
            <label>Name:</label>
            <input type="text" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" value={currentUser.phone} onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} required />
          </div>
          <div>
            <label>Status:</label>
            <select value={currentUser.isActive} onChange={(e) => setCurrentUser({ ...currentUser, isActive: e.target.value === 'true' })}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <button type="submit">{currentUser.id ? 'Update User' : 'Add User'}</button>
          <button type="button" onClick={() => { setFormVisible(false); setCurrentUser({ id: '', name: '', email: '', phone: '', isActive: true }); }}>Cancel</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
