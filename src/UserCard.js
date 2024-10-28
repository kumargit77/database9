// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user, dispatch }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch({ type: 'DELETE_USER', payload: user.id });
    }
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Status: {user.status ? 'Active' : 'Inactive'}</p>
      <button onClick={() => dispatch({ type: 'UPDATE_USER', payload: { ...user, status: !user.status } })}>
        Toggle Status
      </button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default UserCard;
