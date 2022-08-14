import React from 'react'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import DailyScreen from './pages/DailyScreen'
import HomeScreen from './pages/HomeScreen'
import AddScreen from './pages/AddScreen'
import RegisterScreen from './pages/RegisterScreen'
import DocViewerScreen from './pages/DocViewerScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { useSelector } from 'react-redux'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <Router>
      {userInfo ? <Header /> : <></>}
      <main>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/daily' element={<DailyScreen />} />
          <Route path='/doc' element={<DocViewerScreen />} />
          <Route path='/add' element={<AddScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
