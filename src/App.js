import React from 'react'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import InboxScreen from './pages/InboxScreen'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<LoginScreen />} exact />
          <Route path='/inbox' element={<InboxScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}

export default App
