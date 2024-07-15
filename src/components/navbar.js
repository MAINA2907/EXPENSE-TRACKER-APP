import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


function NavBar () {

  const [user, setUser] = useOutletContext()

    const navigate = useNavigate()

    const handleLogOut = () => {
      localStorage.removeItem("access_token")
      setUser(null)
      navigate("/expense-tracker-app/login")
    }

    return (
        <nav class=" navbar ">
            <div class=" barGraph container-fluid ">
              <a class="navbar-brand" onClick={() => navigate('/expense-tracker-app')}>EXPENSE TRACKER</a>
                <button class="btn btn-outline-success " type="button " onClick={() => navigate('/expense-tracker-app')}>
                  DASHBOARD
                </button>
                <button class="btn btn-outline-success" type="button" onClick={() => navigate('/expense-tracker-app/budgets')}>
                  BUDGET
                </button>
                <button class="btn btn-outline-success " type="button " onClick={() => navigate('/expense-tracker-app/expenses')}>
                  EXPENSES
                </button>
                <button class="btn btn-outline-success " type="button " onClick= {handleLogOut}>
                  LOGOUT
                </button>
            </div>
          </nav>
    )
}

export default NavBar

