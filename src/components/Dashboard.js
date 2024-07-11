import React from "react";

function Dashboard() {
    
  return (
    <section>
      <section>
        <div className=" ">
          <nav class="navbar navbar-expand-lg navbar-dark  m-4">
            <div class="container-fluid ">
              <a class="navbar-brand mb-0 h1 ">EXPENSE TRACKER</a>
            </div>
          </nav>
        </div>

        {/* Buttons */}
        <form class="d-grid gap-2 d-md-flex justify-content-md-end ">
          <button class="btn btn-warning me-2 " type="button" >
            EXPENSES
          </button>
          <button class="btn btn-primary me-2" type="button">
            BUDGET
          </button>
        </form>
     </section>


      <br></br>
      <br></br>

      <section className="container ">
        <div className="row ">
          <div className="col-3  border shadow-sm">
            <div className="d-flex flex-column">
              <button class="btn btn-warning m-3" type="button">
                Dashboard
              </button>
              <button class="btn btn-warning m-3 " type="button">
                Expenses
              </button>
              <button class="btn btn-warning m-3" type="button">
                Budget
              </button>
            </div>
          </div>

          <div className=" col-9">
            <h2 className="p-3 mb-2 bg-warning-subtle text-warning-emphasis">
              HI welcome to Group 8 Expense tracker
            </h2>
            <div class="row">
              <div class="col-md-4 mb-4">
                <div class="card m-3">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Card subtitle
                    </h6>
                    <p class="card-text">Some quick example text</p>
                    <a href="#" class="card-link">
                      View Budget
                    </a>
                    <a href="#" class="card-link">
                      View Expense
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card m-3">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Card subtitle
                    </h6>
                    <p class="card-text">Some quick example text</p>
                    <a href="#" class="card-link">
                      View Budget
                    </a>
                    <a href="#" class="card-link">
                      View Expense
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card m-3">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Card subtitle
                    </h6>
                    <p class="card-text">Some quick example text</p>
                    <a href="#" class="card-link">
                      View Budget
                    </a>
                    <a href="#" class="card-link">
                      View Expense
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card m-3">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                      Card subtitle
                    </h6>
                    <p class="card-text">Some quick example text</p>
                    <a href="#" class="card-link">
                      View Budget
                    </a>
                    <a href="#" class="card-link">
                      View Expense
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
