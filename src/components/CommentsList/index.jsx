import React from 'react'
import PropTypes from 'prop-types'
import s from './CommentsList.module.css'
import Comment from './Comment/Comment'
import CommentForm from '../CommentForm'
import EmptyList from '../EmptyList'
import { useAuth } from '../../hooks/useAuth'

const CommentsList = ({ comments, post }) => {
   const { user } = useAuth()

   return (
      <div className={s.comms}>
         <div className={s.comms_title}>
            <span className={s.title_span}>
               Comments ({post.commentsCount})
            </span>
         </div>
         {user
            ? <div className={s.comms_form}>
               <CommentForm
                  post={post}
               />
            </div>
            : null}
         <div className={s.comms_list}>
            {comments?.length > 0
               ? comments.map((com) => {
                  return <Comment
                     {...com}
                     postId={post.id}
                     key={com.id}
                     postCreator={post.user}
                  />
               })
               : <EmptyList>
                  Comments not found
               </EmptyList>}
         </div>
      </div>
   )
}

export default CommentsList

CommentsList.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.string,
      commentsCount: PropTypes.number,
      likesCount: PropTypes.number
   }),

   comments: PropTypes.arrayOf(PropTypes.shape({
      body: PropTypes.string,
      id: PropTypes.string,
      createdAt: PropTypes.string,
      user: PropTypes.shape({
         id: PropTypes.string,
         username: PropTypes.string,
      })
   }))
}