// src/components/UserForm.js
import React, { useState } from 'react';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { dispatch } = useUserContext();
  const [user, setUser] = useState({ name: '', email: '', phone: '', status: true });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...user,
      id: Date.now(), // Simple ID generation
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    navigate('/users');
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={user.name} 
          onChange={(e) => setUser({ ...user, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={user.phone} 
          onChange={(e) => setUser({ ...user, phone: e.target.value })} 
          required 
        />
        <label>
          Status:
          <select 
            value={user.status} 
            onChange={(e) => setUser({ ...user, status: e.target.value === 'true' })}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
