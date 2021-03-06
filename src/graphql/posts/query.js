import { gql } from '@apollo/client'

export const GET_POSTS = gql`
   query posts {
      posts {
         body, id,  commentsCount, likesCount, createdAt, user {
            id, username, avatar
         }
      }
   }
`

export const GET_POST = gql`
   query post($id: ID!) {
      post(id: $id) {
         body, id,  commentsCount, likesCount, createdAt, user {
            id, username, avatar
         },
      }

      comments(id: $id) {
         body, id, createdAt, user {
            id, username, avatar
         }
      }
   }
`