import React from 'react'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LoginScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}

export default App
