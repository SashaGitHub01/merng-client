import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import s from '../styles/Post.module.css'
import Title from '../components/Title'
import { GET_POST } from '../graphql/posts/query'
import PostItem from '../components/Post'
import CommentsList from '../components/CommentsList'
import GoBack from '../components/GoBack'

const Post = () => {
   const params = useParams()
   const [comments, setComments] = useState([])
   const [post, setPost] = useState(null)
   const [fetchPost, { data, loading, error }] = useLazyQuery(GET_POST);

   useEffect(() => {
      if (!loading && data) {
         setPost(data.post)
         setComments(data.comments)
      }
   }, [loading, data])

   useEffect(() => {
      if (params.id) {
         fetchPost({
            variables: {
               id: params.id
            }
         })
      }
   }, [params])

   return (
      <Layout>
         <GoBack>
            Back to posts
         </GoBack>
         <Title>
            Post
         </Title>
         <div className={s.post_page}>
            {post
               ? <>
                  <PostItem
                     {...post}
                  />
                  <CommentsList
                     comments={comments}
                     post={post}
                  />
               </>
               : <div>
                  Loading...
               </div>}
         </div>
      </Layout>
   )
}

export default Post