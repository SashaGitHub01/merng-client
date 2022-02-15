import React from 'react'
import s from './Comment.module.css'
import PropTypes from 'prop-types'
import { getPostDate } from '../../../utils/moment'
import CommentControl from './CommentControl'

const Comment = ({ body, id, createdAt, user, postCreator, postId }) => {
   return (
      <div className={s.comment}>
         <div className={s.comment_head}>
            <div className={s.user_img}>
               <img
                  src="https://res.cloudinary.com/twitter-uploads/image/upload/v1638945837/Avatars/corhyulgwhglo9bdkz4i.jpg"
                  alt=""
               />
            </div>
            <div className={s.comment_info}>
               <div className={s.username}>
                  <span>{user.username}</span>
               </div>
               <div className={s.comment_date}>
                  {getPostDate(+createdAt)}
               </div>
            </div>
         </div>
         <div className={s.comment_body}>
            <pre>{body}</pre>
         </div>
         <CommentControl
            postId={postId}
            commentId={id}
            commentCreator={user}
            postCreator={postCreator}
         />
      </div>
   )
}

export default Comment

Comment.propTypes = {
   postCreator: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.string
   }),
   body: PropTypes.string,
   id: PropTypes.string,
   createdAt: PropTypes.string,
   user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
   })
}