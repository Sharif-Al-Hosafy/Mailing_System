import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './bootstrap.min.css'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.8:5000/'

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
)
