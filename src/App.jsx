import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter/index'
import './App.css';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AUTH_ME } from './graphql/users/mutations';
import { useAuth } from './hooks/useAuth';
import { GET_LIKES } from './graphql/likes/query'

function App() {
   const [fetchAuth] = useMutation(AUTH_ME)
   const [fetchLikes] = useLazyQuery(GET_LIKES)
   const { authSuccess, authError, isInitialized, likesSuccess, user } = useAuth()

   const auth = async () => {
      try {
         const res = await fetchAuth();
         authSuccess(res.data?.auth)
      } catch (err) {
         authError(err.message)
      }
   }

   const getLikes = async (id) => {
      try {
         const res = await fetchLikes({
            variables: {
               id
            }
         })
         likesSuccess(res.data?.likes)
      } catch (err) {
         throw Error(err)
      }
   }

   useEffect(() => {
      auth()
   }, [])

   useEffect(() => {
      if (user?.id) {
         getLikes(user.id)
      }
   }, [user])

   return (
      <>
         {isInitialized
            ? <AppRouter />
            : <div>Loading...</div>}
      </>
   );
}

export default App;
