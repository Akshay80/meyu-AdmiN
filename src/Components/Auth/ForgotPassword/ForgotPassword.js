import React from 'react'
import './ForgotPassword.scss';

const ForgotPassword = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="cards">
  <div className="card-body">
  <h3 className="card-title1 text-center">MEYU</h3>
    <p className="card-title2 text-center mb-4">Meyu Admin</p>
    <p className="card-text fw-bold color-grey">Forgot Password</p>
    <div className="mb-3 mt-4">
  <label for="exampleFormControlInput1" class="form-label"><small>Registered Email</small></label>
  <input type="email" className="form-control shadow-none" id="exampleFormControlInput1" placeholder="Email" />
</div>
<div className="mt-4">
    <button type="submit" className="btn btn-primary outline-none">Submit</button>
  </div>
  </div>
</div>


            </div>
            
        </div>
    )
}

export default ForgotPassword
