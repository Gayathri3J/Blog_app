import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import LearnOne from './components/LearnOne'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/blog/:id" element={<LearnOne />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/add-blog" element={<Add />} />
          <Route path="/add/:id" element={<Add />} />
        </Route>
        {/* <Route path="/add-blog" element={<Add />} />
        <Route path="/add/:id" element={<Add />} />   */}
      </Routes>
    </div>
  )
}

export default App
