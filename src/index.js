import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Styles/_custom.scss'
import "react-datepicker/dist/react-datepicker.css";
import Login from './Components/Auth/Login/Login';
import Home from './Pages/Dashboard/index';

const token = localStorage.getItem('token');
if(!token)
 {
    <Login />
 }
 else
 {
  <Home />
 }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
