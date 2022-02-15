import React from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import s from './Layout.module.css'

const Layout = ({ children }) => {
   return (
      <div className={s.layout}>
         <Header />
         <Main>
            {children}
         </Main>
      </div>
   )
}

export default Layout