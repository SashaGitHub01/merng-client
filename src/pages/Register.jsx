import React from 'react'
import RegisterForm from '../components/RegisterForm'
import s from '../styles/Register.module.css'
import Layout from '../components/Layout'

const Register = () => {
   return (
      <Layout>
         <div className={s.login_page}>
            <div className={s.title}>
               <span>Sign Up</span>
            </div>
            <RegisterForm />
         </div>
      </Layout>
   )
}

export default Register