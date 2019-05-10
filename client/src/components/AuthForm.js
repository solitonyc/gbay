import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm(props) {
  const {authFormData, handleChange, handleSubmit, authFormTitle} = props
  console.log(authFormData)
 
  return (
    <div>
      <h2>{authFormTitle}</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
        // updateUser()
      }}>
        Email: <input autoComplete="email" name="email" type="email" value={authFormData.email} onChange={handleChange} />&nbsp;
        Password: <input autoComplete="current-password" name="password" type="password" value={authFormData.password} onChange={handleChange}/>
        <button>Submit</button>
      </form>
      { 
        authFormTitle === "Login" 
        && 
        <Link to="/register">Register</Link>
      }
    </div>
  )
}