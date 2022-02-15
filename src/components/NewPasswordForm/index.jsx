import React, { useState } from 'react'
import Input from '../Input'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button'
import s from './NewPasswordForm.module.css'
import { useMutation } from '@apollo/client'
import { CHANGE_PASSWORD } from '../../graphql/users/mutations'
import FormErrors from '../FormErrors'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const NewPasswordForm = ({ secret }) => {
   const [success, setSuccess] = useState(false)
   const nav = useNavigate()
   const [fetchChange] = useMutation(CHANGE_PASSWORD, {
      onError(err) {
         setError('error', { message: err.message })
      },

      update(_, { data }) {
         if (data?.changePassword?.username) {
            setSuccess(true)
            setTimeout(() => nav('/login'), 5000)
         }
      }
   })
   const schema = Yup.object().shape({
      password: Yup.string()
         .min(5, 'Password must contain atleast 5 characters')
         .max(20, 'Password must contain from 5 to 20 characters')
         .required('Required field'),
      password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords should be equal'),
   })

   const { handleSubmit, formState: { errors, isSubmitting }, setError, control } = useForm({
      resolver: yupResolver(schema)
   })

   const onSubmit = async ({ password, ...data }) => {
      await fetchChange({
         variables: {
            input: {
               password,
               secret
            }
         }
      })
   }

   return (
      <div className={s.form_cont}>
         {!success
            ? <form action="" className={s.form} onSubmit={handleSubmit(onSubmit)}>
               <Controller
                  control={control}
                  name='password'
                  defaultValue={''}
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        type='password'
                        label={'New password'}
                     />
                  }}
               />
               <Controller
                  control={control}
                  name='password2'
                  defaultValue={''}
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        type='password'
                        label={'Confirm password'}
                     />
                  }}
               />
               <div className={s.button}>
                  <Button type='submit' disabled={isSubmitting}>
                     save
                  </Button>
               </div>
               {Object.values(errors).length > 0
                  && <FormErrors errors={Object.values(errors)} />}
            </form>
            : <Stack sx={{ width: '100%' }}>
               <Alert severity='success'>
                  Success! You will be redirected to the login page in few seconds.
               </Alert>
            </Stack>}
      </div>
   )
}

export default NewPasswordForm

NewPasswordForm.propTypes = {
   secret: PropTypes.string
}