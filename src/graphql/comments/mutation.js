import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
   mutation createComment($input: CommentInput!) {
      createComment(input: $input) {
         id, body, createdAt, user {
            id, username
         }
      }
   }
`

export const DELETE_COMMENT = gql`
   mutation deleteComment($input: CommentDeleteInput!) {
      deleteComment(input: $input) {
         id
      }
   }
`