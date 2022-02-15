import React from 'react'
import s from './Button.module.css'
import PropTypes from 'prop-types'

const Button = ({ children, type, variant, onClick }) => {
   return (
      <button
         className={`${s.button} ${variant === 'secondary' ? s.secondary : ''}`}
         onClick={onClick}
         type={type}
         variant={variant}
      >
         <span>
            {children}
         </span>
      </button>
   )
}

export default Button

Button.propTypes = {
   children: PropTypes.node.isRequired,
   type: PropTypes.string,
   variant: PropTypes.oneOf(['primary', 'secondary']),
   onClick: PropTypes.func,
}