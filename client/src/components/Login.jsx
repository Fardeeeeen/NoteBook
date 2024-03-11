import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios' ;

const AUTH_API_URL = "http://localhost:5000/api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      email,
      password,
    });
    if (response.data.success === true) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  } catch (error) {
    setError('Login failed. Please check your credentials.');
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h3 className="card-header">Login</h3>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
            <div className="card-footer">
              
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;