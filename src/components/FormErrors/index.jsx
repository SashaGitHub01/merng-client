import React from 'react'
import s from './FormErrors.module.css'
import PropTypes from 'prop-types'

const FormErrors = ({ errors }) => {

   return (
      <div className={s.errors}>
         <ul className={s.list}>
            {errors.map(({ message }) => {
               return <li className={s.err_item} key={message + Math.random()}>
                  {message}
               </li>
            })}
         </ul>
      </div>
   )
}

export default FormErrors

FormErrors.propTypes = {
   errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string
   }))
}