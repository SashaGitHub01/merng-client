import { gql } from "@apollo/client";

export const BACKGROUND_UPLOAD = gql`
   mutation background($image: Upload!) {
      background(image: $image) 
   }
`

export const AVATAR_UPLOAD = gql`
   mutation avatar($image: Upload!) {
      avatar(image: $image) 
   }
`