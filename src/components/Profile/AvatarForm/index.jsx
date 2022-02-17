import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import s from './AvatarForm.module.css'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client';
import { AVATAR_UPLOAD } from '../../../graphql/uploads/mutation';
import { GET_USER } from '../../../graphql/users/query';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

const AvatarForm = ({ avatar, owner, me }) => {
   const [file, setFile] = useState(null)
   const [fetchUploadAvatar] = useMutation(AVATAR_UPLOAD, {
      update: (cache) => {
         const data = cache.readQuery({
            query: GET_USER, variables: {
               id: me.id
            }
         })
         console.log(data)
         cache.writeQuery({
            query: GET_USER,
            data: { user: { ...data.user, avatar: file?.url }, userPosts: data.userPosts },
            variables: {
               id: me.id
            }
         })
         setFile(null)
      }
   })

   const handleChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const blob = new Blob([file]);
      const url = URL.createObjectURL(blob);

      setFile({ url, file });
   }

   const uploadAvatar = async () => {
      try {
         const myFile = file?.file;
         if (!myFile) return;

         await fetchUploadAvatar({
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
      <div className={s.avatar}>
         <img src={file?.url || avatar} alt="user" />
         {owner
            && <div className={s.form}>
               <input
                  hidden
                  onChange={handleChange}
                  id='avatar'
                  accept='image/*'
                  name='image'
                  type='file'
               />
               <label htmlFor="avatar" className={s.label}>
                  <CameraAltIcon />
               </label>
               {!!file
                  && <div className={s.buttons}>
                     <IconButton color='success' onClick={uploadAvatar}>
                        <CheckIcon color='success' />
                     </IconButton>
                     <IconButton color='error' onClick={clearFile}>
                        <CancelIcon color='error' />
                     </IconButton>
                  </div>}
            </div>}
      </div>
   )
}

export default AvatarForm

AvatarForm.propTypes = {
   avatar: PropTypes.string,
   owner: PropTypes.bool,
   me: PropTypes.shape({
      id: PropTypes.string
   })
}