import React from 'react'
import Layout from '../components/Layout'
import s from '../styles/Password.module.css'
import PasswordForm from '../components/PasswordForm'

const Password = () => {
   return (
      <Layout>
         <div className={s.head}>
            <span>Forgot password</span>
         </div>
         <div className={s.form_cont}>
            <PasswordForm />
         </div>
      </Layout>
   )
}

export default Password