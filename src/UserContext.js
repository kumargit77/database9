// src/components/UserContext.js
import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890', status: true },
    { id: 2, name: 'Bob', email: 'bob@example.com', phone: '098-765-4321', status: false },
    // Add more users as needed
  ],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return React.useContext(UserContext);
};
