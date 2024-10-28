// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import UserList from './UserList';
import UserForm from './UserForm';
import UserEdit from './UserEdit';
import NotFound from './NotFound';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
