import React from 'react'
import PropTypes from 'prop-types'
import s from './Title.module.css'

const Title = ({ children }) => {
   return (
      <h4 className={s.title}>
         {children}
      </h4>
   )
}

export default Title

Title.propTypes = {
   children: PropTypes.node
}