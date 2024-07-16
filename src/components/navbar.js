import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


function NavBar () {

  const [user, setUser] = useOutletContext()

    const navigate = useNavigate()

    const handleLogOut = () => {
      localStorage.removeItem("access_token")
      setUser(null)
      navigate("/expense-tracker-app")
    }

    return (
        <nav class=" navbar bg-body-tertiary">
            <div class=" container-fluid ">
              <a class="navbar-brand" >EXPENSE TRACKER</a>
              <form className='d-flex'>
                {/* <button class="btn btn-outline-success " type="button " onClick={() => navigate('/expense-tracker-app/dashboard')}>
                  DASHBOARD
                </button> */}
                <button class="btn btn-outline-success" type="button" onClick={() => navigate('/expense-tracker-app/budgets')}>
                  BUDGET
                </button>
                <button class="btn btn-outline-success " type="button " onClick={() => navigate('/expense-tracker-app/expenses')}>
                  EXPENSES
                </button>
                <button class="btn btn-outline-success " type="button " onClick= {handleLogOut}>
                  LOGOUT
                </button>
                </form>
            </div>
          </nav>
    )
}

export default NavBar

