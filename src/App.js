import { Outlet } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ExpenseTracker from "./components/Expense";
import Budget from "./components/Budget";
import { useState,useEffect } from "react";



function App() {

  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      fetch("https://expense-tracker-api-3-ibzf.onrender.com/check_login" , {
        headers: { 'Authorization': `Bearer ${token}` }

      })
      .then((res) => res.json())
      .then((data) => setUser(data))

    }
  }, [])
 
  return (
    <div className="App">
     <Outlet context = {[user,setUser]}/>


      
    </div>
  );
}

export default App;
