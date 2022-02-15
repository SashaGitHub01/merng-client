import React, { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import s from './PostControls.module.css'
import { Comment, Heart, HeartFill } from '../../../assets/icons'
import { useMutation } from '@apollo/client'
import { DELETE_POST } from '../../../graphql/posts/mutation'
import { GET_POST, GET_POSTS } from '../../../graphql/posts/query'
import { LIKE_ACTION } from '../../../graphql/likes/mutation'
import { useAuth } from '../../../hooks/useAuth'
import { useParams, useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete';
import AskModal from '../../AskModal'

const PostControls = ({ id, commentsCount, likesCount, user, navToPost }) => {
   const params = useParams()
   const nav = useNavigate()
   const { removeLike, addLike, user: me, likes } = useAuth()

   const [owner, setOwner] = useState(false)
   const [open, setOpen] = useState(false)
   const [liked, setLiked] = useState(false)
   const [likeCount, setLikeCount] = useState(0)

   const [fetchLike, { loading }] = useMutation(LIKE_ACTION, {
      update: (cache, result) => {
         if (!params?.id) {
            const data = cache.readQuery({ query: GET_POSTS })
            const posts = [...data.posts];
            const updated = posts.map((post) => {
               if (post.id === id) {
                  const copy = { ...post }
                  if (liked) {
                     copy.likesCount -= 1
                     removeLike(result.data?.like.id)
                  } else {
                     copy.likesCount += 1
                     addLike(result.data?.like)
                  }
                  return copy
               } else {
                  return post;
               }
            })
            cache.writeQuery({ query: GET_POSTS, data: { posts: updated } })
         } else {
            const data = cache.readQuery({ query: GET_POST, variables: { id } })
            const post = { ...data.post };
            if (liked) {
               post.likesCount -= 1
               removeLike(result.data?.like.id)
            } else {
               post.likesCount += 1
               addLike(result.data?.like)
            }
            cache.writeQuery({ query: GET_POST, data: { post: post, comments: data.comments } })
         }
      }
   })

   const [fetchDeletePost] = useMutation(DELETE_POST, {
      update: (cache) => {
         const data = cache.readQuery({ query: GET_POSTS });
         const newPosts = data.posts.filter((post) => post.id !== id)
         cache.writeQuery({ query: GET_POSTS, data: { posts: [...newPosts] } })

         if (params.id) {
            nav('/')
         }
      }
   })

   useEffect(() => {
      if (me?.id === user?.id) setOwner(true)
   }, [user, me])

   useEffect(() => {
      const like = likes?.find((l) => l.post === id)
      if (like) {
         setLiked(true)
      } else {
         setLiked(false)
      }
   }, [me, likes])

   useEffect(() => {
      if (likesCount >= 0) {
         setLikeCount(likesCount)
      }
   }, [likesCount])

   const handleDelete = () => {
      fetchDeletePost({
         variables: {
            id: id
         }
      })
   }

   const handleLike = async () => {
      if (!me) return nav('/login')

      if (liked) {
         setLiked(false)
         setLikeCount(likeCount - 1)
      } else {
         setLiked(true)
         setLikeCount(+likeCount + 1)
      }
      try {
         await fetchLike({
            variables: {
               id: id
            }
         })
      } catch (err) {
         console.log(err.message);
      }
   }

   const handleOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   return (
      <div className={s.footer}>
         <div className={s.footer_row}>
            <div className={s.footer_left}>
               {owner
                  && <Tooltip
                     arrow={true}
                     placement='right'
                     title='Delete post'
                  >
                     <IconButton onClick={handleOpen} className={s.del_btn}>
                        <DeleteIcon className={s.del_icon} />
                     </IconButton>
                  </Tooltip>}
               <AskModal
                  handleClose={handleClose}
                  open={open}
                  title='Delete post'
                  handleOk={handleDelete}
               >
                  Are you sure you want to delete this post?
               </AskModal>
            </div>
            <div className={s.footer_right}>
               <div className={s.footer_item}>
                  <span>
                     {commentsCount}
                  </span>
                  <button className={s.icon_btn} disabled={false} onClick={navToPost}>
                     <Comment className={`${s.footer_icon} ${s.comment}`} />
                  </button>
               </div>
               <div className={s.footer_item}>
                  <span>
                     {likeCount}
                  </span>
                  <button
                     className={s.icon_btn}
                     onClick={handleLike}
                     disabled={loading}
                  >
                     {liked
                        ? <HeartFill className={`${s.footer_icon} ${s.like_fill}`} />
                        : <Heart className={`${s.footer_icon} ${s.like}`} />
                     }
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PostControls

PostControls.propTypes = {
   id: PropTypes.string,
   navToPost: PropTypes.func,
   commentsCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   likesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
   }),
}
