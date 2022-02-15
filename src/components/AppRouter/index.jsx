import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Home from '../../pages/Home'
import Post from '../../pages/Post'
import Password from '../../pages/Password'
import NewPassword from '../../pages/NewPassword'

const AppRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='post/:id' element={<Post />} />
         <Route path='/login' element={<Login />} />
         <Route path='/password' element={<Password />} />
         <Route path='/reset' element={<NewPassword />} />
         <Route path='/register' element={<Register />} />
      </Routes>
   )
}

export default AppRouter