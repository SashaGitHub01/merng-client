import { gql } from '@apollo/client'

export const SIGN_UP = gql`
   mutation signUp($input: UserInput!) {
      signUp(input: $input) {
         username, id, token, email
      }
   }
`

export const SIGN_IN = gql`
   mutation signIn($input: SignInInput!) {
      signIn(input: $input) {
         username, id, token, email
      }
   }
`

export const AUTH_ME = gql`
  mutation auth {
      auth {
         username, id, email
      }
   }
`

export const CHANGE_PASSWORD = gql`
   mutation changePassword($input: PasswordInput!) {
      changePassword(input: $input) {
         username
      }
   }
`

export const SEND_SECRET = gql`
   mutation sendSecret($input: EmailInput!) {
      sendSecret(input: $input)
   }
`