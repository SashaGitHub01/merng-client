import React from 'react'
import s from './Container.module.css'
import PropTypes from 'prop-types'

const Container = ({ children, className }) => {
   return (
      <div className={`${s.container} ${className}`}>
         {children}
      </div>
   )
}

export default Container