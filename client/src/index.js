import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  
import {
  createBrowserRouter, 
  RouterProvider, 
} from 'react-router-dom';
import Listings from './pages/Listings'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SignedInHome from './pages/SignedInHome';
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />
  }, 
  {
    path: "/listings",
    element: <Listings />
  },
  {
    path: "/signup", 
    element: <SignUp />
  },
  {
    path: "/login", 
    element: <Login />
  },
  {
   path: '/signedin', 
   element: <SignedInHome />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} /> 
);

