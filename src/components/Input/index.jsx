import React from 'react'
import s from './Input.module.css'
import PropTypes from 'prop-types'

const Input = ({ label, onChange, value, name, type, ...other }) => {
   return (
      <div className={s.input_cont}>
         <div className={s.input_label}>
            <span>{label}</span>
         </div>
         <input
            {...other}
            className={s.input}
            onChange={onChange}
            value={value}
            name={type}
            type={type}
         />
      </div>
   )
}

export default Input

Input.propTypes = {
   label: PropTypes.node,
   onChange: PropTypes.func,
   value: PropTypes.string,
   name: PropTypes.string
}