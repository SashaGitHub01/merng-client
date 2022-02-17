import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextareaAutosize } from '@mui/material';
import s from './Textarea.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';


const Textarea = ({ rows, max, counter, value, ...props }) => {
   const [length, setLength] = useState(0)
   const [percent, setPercent] = useState(0)

   useEffect(() => {
      if (counter && max) {
         const val = value.trim().length;
         setLength(val)
         setPercent((val / max) * 100)
      }
   }, [value, max, counter])

   return (
      <div className={s.cont}>
         <TextareaAutosize
            {...props}
            maxLength={max}
            value={value}
            minRows={rows}
            className={s.textarea}
         />
         {counter && max && length
            ? <div className={s.counter}>
               <div className={s.progress}>
                  <CircularProgress
                     className={s.circle_up}
                     size={22}
                     color={(length > max - 10) ? 'warning' : 'primary'}
                     variant='determinate'
                     value={percent}
                  />
                  <CircularProgress
                     size={22}
                     variant='determinate'
                     color='inherit'
                     value={100}
                     className={s.circle}
                  />
               </div>
               <div className={s.symbols}>
                  <span>{length}/</span>
                  <span>{max}</span>
               </div>
            </div>
            : null}
      </div>
   )
}

export default Textarea

Textarea.propTypes = {
   rows: PropTypes.number,
   max: PropTypes.number,
   symbols: PropTypes.number,
   counter: PropTypes.bool,
}

Textarea.defaulProps = {
   rows: 1,
   max: 100
}