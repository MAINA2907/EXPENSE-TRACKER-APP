import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [users, setusers] = useState([{}])
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log('User logged in:', values);
        },
    });
    return (
        <div className="login">
            <div>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                            {showPassword ? "Hide" : "Show"} </button> {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null} </div>
                    <button type="submit" onClick={formik.handleSubmit}>Login</button>
                </form>
                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
