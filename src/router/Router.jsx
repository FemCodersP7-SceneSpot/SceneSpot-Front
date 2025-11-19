import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Landing from '../pages/Landing'

import RegisterScene from '../pages/RegisterScene'
import MovieDetail from '../pages/MovieDetail'


function AppRouter() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />}/>
          <Route path='/register_scene' element={<RegisterScene />}/>
          <Route path='/detail/:id' element={<MovieDetail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default AppRouter