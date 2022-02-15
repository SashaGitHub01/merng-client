import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import NewPasswordForm from '../components/NewPasswordForm'
import s from '../styles/NewPassword.module.css'

const NewPassword = () => {
   const loc = useLocation()
   const [secret, setSecret] = useState(null)

   useEffect(() => {
      const sec = new URLSearchParams(loc.search).get('secret')
      if (sec) {
         setSecret(sec)
      }
   }, [loc])

   return (
      <Layout>
         <div className={s.head}>
            <span>Change password</span>
         </div>
         <div className={s.form_cont}>
            <NewPasswordForm secret={secret} />
         </div>
      </Layout>
   )
}

export default NewPassword