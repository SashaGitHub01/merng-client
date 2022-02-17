import React, { Suspense, lazy } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Loader from '../Loader'

import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Profile from '../../pages/Profile'
import Post from '../../pages/Post'
import Register from '../../pages/Register'
import Password from '../../pages/Password'
import NewPassword from '../../pages/NewPassword'

const AppRouter = () => {
   return (
      <Suspense fallback={<Loader />}>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='post/:id' element={<Post />} />
            <Route path='user/:id' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/password' element={<Password />} />
            <Route path='/reset' element={<NewPassword />} />
            <Route path='/register' element={<Register />} />
         </Routes>
      </Suspense>
   )
}

export default AppRouter