import React, { useEffect, useState } from 'react'
import s from './HeadForm.module.css'
import PropTypes from 'prop-types'
import ImageIcon from '@mui/icons-material/Image';
import { GET_USER } from '../../../graphql/users/query'
import { useMutation } from '@apollo/client'
import { BACKGROUND_UPLOAD } from '../../../graphql/uploads/mutation'
import CheckIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

const HeadForm = ({ background, me, user, owner }) => {
   const [file, setFile] = useState(null)
   const [fetchUpload] = useMutation(BACKGROUND_UPLOAD, {
      update: (cache) => {
         const data = cache.readQuery({
            query: GET_USER, variables: {
               id: me?.id
            }
         })

         cache.writeQuery({
            query: GET_USER,
            data: { user: { ...data.user, background: file?.url }, userPosts: data.userPosts },
            variables: {
               id: me.id
            }
         })
         setFile(null);
      }
   })

   const changeFile = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const blob = new Blob([file]);
      const url = URL.createObjectURL(blob);

      setFile({ url, file });
   }

   const uploadBg = async () => {
      try {
         const myFile = file?.file;
         if (!myFile) return;

         await fetchUpload({
            variables: {
               image: myFile
            }
         })
      } catch (err) {
         console.log(err)
      }
   }

   const clearFile = () => {
      setFile(null)
   }

   return (
      <div
         className={s.overlay}
         style={{
            backgroundImage: `${file?.url || background ? `url(${file?.url || background})` : '#ddf1f12e2'}`,
            backgroundColor: `${file?.url || background ? '' : '#eeeeee'}`
         }}
      >
         {owner
            && <div className={s.form}>
               <label htmlFor="bgimage" title='Change image' className={s.btn}>
                  <div>
                     <ImageIcon sx={{ fontSize: '1.625rem', cursor: 'pointer' }} />
                  </div>
               </label>
               <input
                  hidden
                  onChange={changeFile}
                  accept='image/*'
                  id='bgimage'
                  name='image'
                  type='file'
               />
            </div>}
         {!!file
            && <div className={s.msg}>
               <div className={s.group_btn}>
                  <span>Save this image?</span>
                  <div className={s.buttons}>
                     <IconButton color='success' onClick={uploadBg}>
                        <CheckIcon color='success' />
                     </IconButton>
                     <IconButton color='error' onClick={clearFile}>
                        <CancelIcon color='error' />
                     </IconButton>
                  </div>
               </div>
            </div>}
      </div>
   )
}

export default HeadForm

HeadForm.propTypes = {
   owner: PropTypes.bool,
   background: PropTypes.string,
   me: PropTypes.shape({
      id: PropTypes.string,
   }),

   user: PropTypes.shape({
      id: PropTypes.string,
   })
}