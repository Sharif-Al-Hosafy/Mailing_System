import React from 'react'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import DailyScreen from './pages/DailyScreen'
import HomeScreen from './pages/HomeScreen'
import AddScreen from './pages/AddScreen'
// import DocScreen from "./pages/DocScreen";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/daily' element={<DailyScreen />} />
          <Route path='/add' element={<AddScreen />} />
          {/* <Route path='/doc' element={<DocScreen />} /> */}
        </Routes>
      </main>
    </Router>
  )
}

export default App
