import React from 'react';


const Register = (props) => {

  return (
    <div>
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <p>Register with your Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Register with your Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;