import React from 'react'
import s from './EmptyList.module.css'
import PropTypes from 'prop-types'

const EmptyList = ({ children }) => {
   return (
      <div className={s.empty}>
         <span>
            {children}
         </span>
      </div>
   )
}

export default EmptyList

EmptyList.propTypes = {
   children: PropTypes.node
}