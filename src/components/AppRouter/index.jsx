import React, { Suspense, lazy } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Loader from '../Loader'
import Home from '../../pages/Home'

const Login = lazy(() => import('../../pages/Login'))
const Profile = lazy(() => import('../../pages/Profile'))
const Register = lazy(() => import('../../pages/Register'))
const Post = lazy(() => import('../../pages/Post'))
const Password = lazy(() => import('../../pages/Password'))
const NewPassword = lazy(() => import('../../pages/NewPassword'))

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