
import React from 'react';
import Register from './Register';
import Login from './components/Login'
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  return (

    <div>
        <Login />
      </div>
    
    <div>      
      <Register />
    </div>
    
    <div>
      <Dashboard />
    </div>
 
};

export default App;