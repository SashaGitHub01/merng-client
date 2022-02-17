import { createHttpLink, InMemoryCache, ApolloClient, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { storage } from '../utils/storage'

const link = createUploadLink({
   uri: process.env.REACT_APP_SERVER || 'http://localhost:3001/graphql',
   credentials: 'include'
})

const auth = setContext(() => {
   return {
      headers: {
         authorization: storage.getToken() ? `Bearer ${storage.getToken()}` : ''
      }
   }
})

export const client = new ApolloClient({
   link: from([auth, link]),
   cache: new InMemoryCache({
      typePolicies: {
         Query: {
            fields: {
               posts: {
                  merge: (existing, incoming) => {
                     return incoming
                  }
               },

               post: {
                  merge: (existing, incoming) => {
                     return incoming
                  }
               },

               comments: {
                  merge: (existing, incoming) => {
                     return incoming
                  }
               },
            }
         },
      }
   })
})