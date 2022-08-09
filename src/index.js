import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './bootstrap.min.css'
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './store'

axios.defaults.baseURL = 'http://192.168.1.132:5000/'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
