import React from 'react'
import PropTypes from 'prop-types'
import s from './Post.module.css'
import { getPostDate } from '../../utils/moment'
import { useNavigate } from 'react-router'
import PostControls from './PostControls'

const Post = ({ body, id, commentsCount, likesCount, createdAt, user }) => {
   const nav = useNavigate()

   const navToPost = () => {
      nav(`/post/${id}`)
   }

   const navToUser = () => {
      nav(`/user/${user?.id}`)
   }

   return (
      <div className={s.post}>
         <div className={s.post_item}>
            <div className={s.post_content}>
               <div className={s.post_head}>
                  <div className={s.user_img} onClick={navToUser}>
                     <img
                        src={user.avatar}
                        alt="user"
                     />
                  </div>
                  <div className={s.post_user}>
                     <div className={s.user_name}>
                        <span onClick={navToUser}>
                           {user.username}
                        </span>
                     </div>
                     <div className={s.post_time} onClick={navToPost}>
                        {getPostDate(+createdAt)}
                     </div>
                  </div>
               </div>
               <div className={s.post_body}>
                  <pre>
                     {body}
                  </pre>
               </div>
               <PostControls
                  id={id}
                  navToPost={navToPost}
                  commentsCount={commentsCount}
                  likesCount={likesCount}
                  user={user}
               />
            </div>
         </div>
      </div>
   )
}

export default Post

Post.propTypes = {
   body: PropTypes.string,
   id: PropTypes.string,
   commentsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   likesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   createdAt: PropTypes.string,
   user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.string
   }),
}