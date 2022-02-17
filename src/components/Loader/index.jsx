import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import s from './Loader.module.css'

const Loader = () => {
   return (
      <div className={s.cont}>
         <CircularProgress thickness={3.8} size={50} />
      </div>
   )
}

export default Loader