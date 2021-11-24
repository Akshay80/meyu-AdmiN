import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Styles/_custom.scss'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

axios.defaults.url = 'http://192.168.5.34:8081/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('token');


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
