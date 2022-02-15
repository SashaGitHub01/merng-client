import React from 'react'
import PropTypes from 'prop-types'
import { Back } from '../../assets/icons'
import s from './GoBack.module.css'
import { useNavigate } from 'react-router-dom'

const GoBack = ({ children }) => {
   const nav = useNavigate()

   const handleBack = () => {
      nav('/')
   }

   return (
      <div className={s.back}>
         <button className={s.back_row} onClick={handleBack}>
            <div className={s.back_icon}>
               <Back />
            </div>
            <span className={s.body}>
               {children}
            </span>
         </button>
      </div>
   )
}

export default GoBack;

GoBack.propTypes = {
   children: PropTypes.node
}