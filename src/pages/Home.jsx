import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { GET_POSTS } from '../graphql/posts/query'
import s from '../styles/Home.module.css'
import Post from '../components/Post'
import Head from '../components/Home/Head';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const { loading, data, error } = useQuery(GET_POSTS)

   useEffect(() => {
      if (!loading && data) {
         setPosts(data.posts)
      }
   }, [loading, data])


   return (
      <Layout>
         <Head />
         <div className={s.content}>
            {loading
               ? <div className=''>
                  Loading...
               </div>
               : posts.length > 0
               && <div className={s.grid}>
                  {posts.map((post) => (
                     <Post
                        {...post}
                        key={post.id}
                     />
                  ))}
               </div>
            }
         </div>
      </Layout>
   )
}

export default Home