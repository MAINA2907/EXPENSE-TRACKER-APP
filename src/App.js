import "./App.css";
import Register from "./Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ExpenseTracker from "./components/Expense";
import Budget from "./components/Budget";
// import ExpenseForm from "./components/ExpenseForm";


function App() {
 
  return (
    <div className="App">
      <Login />

      <Register />

      <Dashboard />

      <ExpenseTracker />

      <Budget />

      {/* <ExpenseForm/> */}



      
    </div>
  );
}

export default App;
