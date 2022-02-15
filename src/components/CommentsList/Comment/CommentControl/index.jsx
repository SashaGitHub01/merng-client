import React from 'react'
import { Reply } from '../../../../assets/icons'
import PropTypes from 'prop-types'
import s from './CommentControl.module.css'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../../hooks/useAuth'
import AskModal from '../../../AskModal'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_COMMENT } from '../../../../graphql/comments/mutation'
import { GET_POST } from '../../../../graphql/posts/query'

const CommentControl = ({ postCreator, commentCreator, postId, commentId }) => {
   const [open, setOpen] = useState(false)
   const [owner, setOwner] = useState(false)

   const { user } = useAuth()

   const [fetchDelete] = useMutation(DELETE_COMMENT, {
      update: (cache) => {
         const data = cache.readQuery({ query: GET_POST, variables: { id: postId } })
         const newComms = data.comments.filter((comm) => comm.id !== commentId)
         const post = { ...data.post };
         post.commentsCount -= 1;

         cache.writeQuery({
            query: GET_POST,
            data: { post, comments: newComms },
            variables: {
               id: postId
            }
         })
      }
   })

   useEffect(() => {
      if (user?.id === commentCreator?.id) {
         setOwner(true)
      } else {
         setOwner(false)
      }
   }, [user, commentCreator])

   const handleOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const handleDel = async () => {
      try {
         await fetchDelete({
            variables: {
               input: {
                  id: commentId,
                  post: postId
               }
            }
         })
      } catch (err) {
         console.log(err.message);
      }
   }

   return (
      <div className={s.footer}>
         <div className={s.left_row}>
            {owner && <Tooltip
               arrow={true}
               placement='right'
               title='Delete comment'
            >
               <IconButton className={s.del_btn} onClick={handleOpen}>
                  <DeleteIcon />
               </IconButton>
            </Tooltip>}
            <AskModal
               title='Delete comment'
               open={open}
               handleClose={handleClose}
               handleOk={handleDel}
            >
               Are you sure you want to delete the comment?
            </AskModal>
         </div>
         <div className={s.right_row}>
            <div className={s.reply}>
               <Reply className={s.reply_icon} />
            </div>
            <span className={s.creator}>
               to {postCreator.username}
            </span>
         </div>
      </div>
   )
}

export default CommentControl

CommentControl.propTypes = {
   postId: PropTypes.string,
   commentId: PropTypes.string,
   postCreator: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
   }),

   commentCreator: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
   })
}