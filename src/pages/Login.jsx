import React from 'react'
import Layout from '../components/Layout/index'
import LoginForm from '../components/LoginForm'
import s from '../styles/Login.module.css'

const Login = () => {
   return (
      <Layout>
         <div className={s.login_page}>
            <div className={s.title}>
               <span>Sign In</span>
            </div>
            <LoginForm />
         </div>
      </Layout>
   )
}

export default Login