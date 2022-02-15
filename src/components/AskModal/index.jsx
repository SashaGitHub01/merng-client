import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Button from '../Button'

const AskModal = ({ children, title, open, handleClose, handleOk }) => {
   return (
      <Dialog
         fullWidth={true}
         maxWidth='sm'
         open={open}
         onClose={handleClose}
      >
         <DialogTitle>
            {title}
         </DialogTitle>
         <DialogContent>
            {children}
         </DialogContent>
         <DialogActions>
            <Button onClick={handleOk}>
               YES
            </Button>
            <Button variant='secondary' onClick={handleClose}>
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default AskModal

AskModal.propTypes = {
   children: PropTypes.node,
   title: PropTypes.string,
   open: PropTypes.bool,
   handleClose: PropTypes.func,
   handleOk: PropTypes.func
}