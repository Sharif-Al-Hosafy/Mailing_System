import React from 'react'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import DailyScreen from './pages/DailyScreen'
import HomeScreen from './pages/HomeScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<LoginScreen />} exact />
          <Route path='/home' element={<HomeScreen />} exact />
          <Route path='/daily' element={<DailyScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}

export default App
