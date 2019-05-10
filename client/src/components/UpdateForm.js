import React from 'react';

export default function UpdateForm(props)  {
  const {updateFormTitle, handleSubmit, handleChange, authFormData} = props
    return (
      <div className="authForm">
        <h2>{updateFormTitle}</h2>
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
          
        }}>
          Email: <input autoComplete="email" name="email" type="email" value={authFormData.email} onChange={handleChange} />&nbsp;
          Password: <input autoComplete="current-password" name="password" type="password" value={authFormData.password} onChange={handleChange}/>
          <button>Submit</button>
        </form>
        { 
          updateFormTitle === "Update"
        }
    </div>
    )
  }

