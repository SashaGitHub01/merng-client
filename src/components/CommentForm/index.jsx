import React from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import Textarea from '../Textarea'
import s from './CommentForm.module.css'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { CREATE_COMMENT } from '../../graphql/comments/mutation'
import { GET_POST } from '../../graphql/posts/query'

const CommentForm = ({ post }) => {
   const [fetchCreateComm] = useMutation(CREATE_COMMENT, {
      update: async (cache, { data: { createComment } }) => {
         const data = await cache.readQuery({ query: GET_POST, variables: { id: post.id } })
         const comm = { ...createComment }
         const updPost = { ...data.post, commentsCount: data.post.commentsCount + 1 }
         cache.writeQuery({
            query: GET_POST,
            data: {
               post: updPost,
               comments: [comm, ...data.comments]
            },
            variables: {
               id: post.id
            }
         })
      }
   })
   const schema = Yup.object().shape({
      body: Yup.string().min(1).trim().required()
   })

   const { handleSubmit, control, formState: { isValid, isSubmitting }, reset, getValues } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema)
   })

   const onSubmit = async (data) => {
      try {
         await fetchCreateComm({
            variables: {
               input: {
                  ...data,
                  id: post.id
               }
            }
         })
         reset()
      } catch (err) {
         console.log(err.message);
      }
   }

   return (
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
         <div className={s.form_row}>
            <Controller
               render={({ field: { ref, ...fields } }) => {
                  return <Textarea
                     counter={true}
                     max={150}
                     placeholder={'Type your text...'}
                     {...fields}
                  />
               }}
               control={control}
               name='body'
               defaultValue={''}
            />
            <div className={s.btn_cont}>
               <IconButton type='submit' disabled={!isValid || isSubmitting}>
                  <SendIcon color={!isValid || isSubmitting ? 'disabled' : 'primary'} />
               </IconButton>
            </div>
         </div>
      </form>
   )
}

export default CommentForm

CommentForm.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.string,
   })
}