import React, { useState } from 'react'
import './Login.scss'
import Path from '../../../Constant/RouterConstant'
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState();
  const { handleSubmit, register, errors } = useForm();
  function login() 
{
  alert("Data Registered!");
    } 
    return (
        <div className="container align-items-center">
        <div className="row text-center justify-content-center">

<div className="cards1 align-middle">
  <div className="card-body">
    <h3 className="card-title1">MEYU</h3>
    <p className="card-title2 mb-5">Meyu Admin</p>
    <form onSubmit={handleSubmit(login)}>
    <div className="mb-3 row justify-content-center">
    <div className="col-sm-10">
  <input type="email" className="form-control shadow-none" id="email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              error={!!errors.email}
              inputRef={register({ required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })} placeholder="Email" />
               <p className="errors">{errors.email && "Invalid email address"}</p>
</div>
</div>
<div className="mb-3 row justify-content-center">
    <div className="col-sm-10">
      <input type="password" className="form-control shadow-none" id="inputPassword" placeholder="Password"/>
    </div>
  </div>
  <div className="mt-4 mb-4 row justify-content-center">
  <div className="col-sm-10">
  <button type="button" className="btn btn-primary">Sign In</button>
      </div>
      </div>
    <p>Forgot Password? <a href={Path.forgotPassword} className="link">Click Here</a></p>
    </form>
  </div>

</div>

            



           </div>
        </div>
    )
}

export default Login
