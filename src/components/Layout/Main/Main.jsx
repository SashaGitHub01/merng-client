import React from 'react'
import s from './Main.module.css'
import Container from '../../Container/index'

const Main = ({ children }) => {
   return (
      <main className={s.main}>
         <Container>
            {children}
         </Container>
      </main>
   )
}

export default Main