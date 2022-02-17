import React, { useState } from 'react'
import s from '../styles/Profile.module.css'
import Layout from '../components/Layout'
import GoBack from '../components/GoBack'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../graphql/users/query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import HeadForm from '../components/Profile/HeadForm'
import { useAuth } from '../hooks/useAuth'
import AvatarForm from '../components/Profile/AvatarForm'
import PostsList from '../components/Profile/PostsList'

const Profile = () => {
   const [user, setUser] = useState(null)
   const [posts, setPosts] = useState([])
   const [owner, setOwner] = useState(false)

   const { user: me } = useAuth()
   const params = useParams()
   const [fetchUser, { data, loading }] = useLazyQuery(GET_USER)

   const getUser = async (id) => {
      try {
         await fetchUser({
            variables: {
               id
            }
         })
      } catch (err) {
         console.log(err.message);
      }
   }

   useEffect(() => {
      if (!user || !me) return;

      if (user.id === me.id) {
         setOwner(true)
      } else {
         setOwner(false)
      }
   }, [user, me])

   useEffect(() => {
      if (data?.user) {
         setUser(data.user)
      }

      if (data?.userPosts) {
         setPosts(data.userPosts)
      }
   }, [data])

   useEffect(() => {
      if (params.id) {
         getUser(params.id)
      }
   }, [params])

   return (
      <Layout>
         <div className={s.profile}>
            <GoBack>
               Back
            </GoBack>
         </div>
         <div className={s.user}>
            {loading || !user
               ? <Loader />
               : <div
                  className={s.head}
               >
                  <div className={s.head_content}>
                     <AvatarForm
                        me={me}
                        avatar={user.avatar}
                        owner={owner}
                     />
                     <div className={s.user_info}>
                        <div className={s.username}>
                           <span>
                              {user.username}
                           </span>
                        </div>
                        <div className={s.email}>
                           <span>
                              {user.email}
                           </span>
                        </div>
                     </div>
                  </div>
                  <HeadForm
                     owner={owner}
                     user={user}
                     me={me}
                     background={user.background}
                  />
               </div>}
            {!loading && user
               && <PostsList
                  user={user}
                  posts={posts}
               />}
         </div>
      </Layout>
   )
}

export default Profile