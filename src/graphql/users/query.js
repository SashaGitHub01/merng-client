import { gql } from '@apollo/client'

export const GET_USERS = gql`
   query users {
      users {
         username, id, avatar
      }
   }
`

export const GET_USER = gql`
   query user($id: ID!) {
      user(id: $id) {
         username, id, avatar, email, background
      }

      userPosts(id: $id) {
         id, body, commentsCount, likesCount, createdAt, user {
            id, username, avatar
         },
      }
   }
`