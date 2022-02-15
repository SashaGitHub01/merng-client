import { gql } from '@apollo/client'

export const CREATE_POST = gql`
   mutation createPost($input: PostInput!) {
      createPost(input: $input) {
         id
         body
         user {
            username, id
         }
         createdAt
         likesCount
         commentsCount
      }
   }
`

export const DELETE_POST = gql`
   mutation deletePost($id: ID!) {
      deletePost(id: $id) {
         id
      }
   }
`