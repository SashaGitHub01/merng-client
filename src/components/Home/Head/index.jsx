import React, { useState } from 'react'
import Title from '../../Title'
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../Button'
import s from './Head.module.css'
import CreateForm from '../CreateForm';
import { useAuth } from '../../../hooks/useAuth';

const Head = () => {
   const { user } = useAuth()
   const [open, setOpen] = useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   const handleOpen = () => {
      setOpen(true)
   }

   return (
      <div className={s.title}>
         <Title>
            Recent posts
         </Title>
         {user
            ? <>
               <div className={s.title_btn}>
                  <Button onClick={handleOpen}>
                     <div className={s.btn_row}>
                        <AddIcon className={s.plus_icon} />
                        <span>Create post</span>
                     </div>
                  </Button>
               </div>
               <Dialog
                  fullWidth
                  maxWidth='sm'
                  onClose={handleClose}
                  open={open}
               >
                  <div className={s.modal}>
                     <CreateForm handleClose={handleClose} />
                  </div>
               </Dialog>
            </>
            : null}
      </div>
   )
}

export default Head