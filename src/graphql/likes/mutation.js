import { gql } from "@apollo/client";

export const LIKE_ACTION = gql`
   mutation like($id: ID!) {
      like(id: $id) {
         id, 
         post,
         user,
   }
}
`