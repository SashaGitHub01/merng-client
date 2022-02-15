import { gql } from "@apollo/client";

export const GET_LIKES = gql`
   query likes($id: ID!) {
      likes(id:$id) {
         id, 
         post,
         user
      }
   }
`