import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Landing from '../pages/Landing'
import ScenesMap from '../pages/ScenesMap'
import RegisterScene from '../pages/RegisterScene'
import UserProfile from '../pages/UserProfile'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}/>
        <Route path='/' element={<Landing />}/>
        <Route path='/map' element={<ScenesMap />}/>
        <Route path='/register_scene' element={<RegisterScene />}/>
        <Route path='/profile' element={<UserProfile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter