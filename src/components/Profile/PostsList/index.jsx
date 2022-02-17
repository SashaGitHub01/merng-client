import React from 'react'
import PropTypes from 'prop-types'
import s from './PostsList.module.css'
import Post from '../../Post'
import EmptyList from '../../EmptyList'

const PostsList = ({ user, posts }) => {
   return (
      <div className={s.posts}>
         <div className={s.posts_title}>
            <span>{user.username}'s posts:</span>
         </div>
         <div className={s.posts_list}>
            {posts && posts.length > 0
               ? posts.map((post) => <Post {...post} key={post.id} />)
               : <EmptyList>
                  The user has no posts
               </EmptyList>}
         </div>
      </div>
   )
}

export default PostsList

PostsList.propTypes = {
   user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.string
   }),
   posts: PropTypes.arrayOf(PropTypes.shape({
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
   }))
}