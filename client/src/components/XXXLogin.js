import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';



const Login = (props) => {

  return (
    <div>
      <h2>login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p>Login with your Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Login with your Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <button>Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default Login

