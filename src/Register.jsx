import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import './Register.css';


const Register = () => {
  const [users, setUsers] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    console.log("FETCH! ");
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name").max(15),
    password: yup
      .string()
      .required("Must enter password")
      .min(8, 'Password must be at least 8 characters'),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('https://expense-tracker-api-3-ibzf.onrender.com/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      .then((res) => {
        if (res.ok) {
          navigate('/login')
        } else {
          throw new Error('Failed to register');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error scenarios, e.g., show error message to the user
      });
    },
  });

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Hello, Create account</h2>
        <div><p>Already have an account? <a href='/login'>Login</a></p> </div>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            id="email"
            name="email"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p style={{ color: "red" }}> {formik.errors.email}</p>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            name="name"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p style={{ color: "red" }}> {formik.errors.name}</p>

          <label htmlFor="password">Password</label>
          <br />

          <input
            id="password"
            name="password"
            className="input"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          /><br></br>
          <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
            {showPassword ? 'Hide' : 'Show Password'}
          </button>
          <p style={{ color: "red" }}> {formik.errors.password}</p>
          <button type="submit" className="button">CREATE ACCOUNT</button>
        </form>

        {/* <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>name</th>/
            <th>email</th>/
            <th>password</th>
          </tr>
          {users === "undefined" ? (
            <p>Loading</p>
          ) : (
            users.map((user, i) => (
              <>
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table> */}

      </div>

    </div>
  );
};

export default Register