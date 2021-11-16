import React from 'react'
import './Signup.scss'

const Signup = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="cards2 mb-5 mt-5">
  <div className="card-body">
  <h3 className="card-title1 text-center">MEYU</h3>
    <p className="card-title2 mb-2 text-center">Meyu Admin</p>
    <form className="row g-3" autoComplete="off">
  <div className="col-md-12">
    <label for="inputEmail4" className="form-label">Name</label>
    <input type="email" className="form-control shadow-none" id="name" placeholder="Name"/>
  </div>
  <div className="col-md-12">
    <label for="inputPassword4" className="form-label">Email</label>
    <input type="email" className="form-control shadow-none" id="email" placeholder="Email"/>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Password</label>
    <input type="password" className="form-control shadow-none" id="password" placeholder="Password"/>
  </div>
  <div className="col-12">
    <label for="inputAddress2" className="form-label">Confirm Password</label>
    <input type="password" className="form-control shadow-none" id="confirmPassword" placeholder="Confirm Password"/>
  </div>
  <div className="col-12 mt-4">
    <button type="submit" className="btn btn-primary">Sign In</button>
  </div>
</form>
  </div>
</div>
            </div>
        </div>
    )
}

export default Signup