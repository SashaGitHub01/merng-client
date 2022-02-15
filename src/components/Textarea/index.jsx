import React from 'react'
import PropTypes from 'prop-types'
import { TextareaAutosize } from '@mui/material';
import s from './Textarea.module.css'


const Textarea = ({ rows, ...props }) => {
   return (
      <TextareaAutosize
         {...props}
         minRows={rows}
         className={s.textarea}
      />
   )
}

export default Textarea

Textarea.propTypes = {
   rows: PropTypes.number
}

Textarea.defaulProps = {
   rows: 1
}