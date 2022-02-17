import React, { useState } from 'react'
import s from './CreateForm.module.css'
import PropTypes from 'prop-types'
import DialogCont from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Textarea from '../../Textarea';
import Button from '../../Button'
import ImageIcon from '@mui/icons-material/Image';
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../../../graphql/posts/mutation'
import FormErrors from '../../FormErrors'
import { useForm, Controller } from 'react-hook-form'
import { GET_POSTS } from '../../../graphql/posts/query';

const CreateForm = ({ handleClose }) => {
   const [fetchCreatePost] = useMutation(CREATE_POST, {
      update: async (cache, { data: createPost }) => {
         const data = cache.readQuery({ query: GET_POSTS })

         cache.writeQuery({
            query: GET_POSTS,
            data: { posts: [createPost.createPost, ...data.posts] }
         })

         reset()
         handleClose()
      }
   })
   const { handleSubmit, control, setError, formState: { errors }, reset } = useForm()

   const onSubmit = async (data) => {
      try {
         await fetchCreatePost({
            variables: {
               input: data
            }
         })
      } catch (err) {
         setError('create', { message: err.message })
      }
   }

   return (
      <form className={s.create_form} onSubmit={handleSubmit(onSubmit)}>
         <DialogTitle className={s.form_head}>
            <span>
               Create new post:
            </span>
         </DialogTitle>
         <DialogCont>
            <Controller
               render={({ field: { ref, ...fields } }) => {
                  return <Textarea
                     max={250}
                     counter={true}
                     {...fields}
                  />
               }}
               name='body'
               control={control}
               defaultValue=""
            />
            {Object.values(errors).length > 0
               && <FormErrors errors={Object.values(errors)} />}
         </DialogCont>
         <DialogActions>
            <Button type='submit'>
               Create
            </Button>
            <Button
               variant='secondary'
               type='button'
               onClick={handleClose}
            >
               Cancel
            </Button>
         </DialogActions>
      </form>
   )
}

export default CreateForm

CreateForm.propTypes = {
   handleClose: PropTypes.func,
}