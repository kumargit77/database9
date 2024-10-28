// src/components/UserEdit.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const UserEdit = () => {
  const { id } = useParams();
  const { state, dispatch } = useUserContext();
  const user = state.users.find(user => user.id === Number(id));
  const [editedUser, setEditedUser] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_USER', payload: editedUser });
    navigate('/users');
  };

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={editedUser.name} 
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          value={editedUser.email} 
          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          value={editedUser.phone} 
          onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} 
          required 
        />
        <label>
          Status:
          <select 
            value={editedUser.status} 
            onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value === 'true' })}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserEdit;
