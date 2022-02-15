import React, { useState } from 'react'
import Input from '../Input'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button'
import s from './PasswordForm.module.css'
import { useMutation } from '@apollo/client'
import { SEND_SECRET } from '../../graphql/users/mutations'
import FormErrors from '../FormErrors'
import * as Yup from 'yup'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, Link } from 'react-router-dom'

const PasswordForm = () => {
   const nav = useNavigate()
   const [success, setSuccess] = useState(false)
   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email format').required('Required field')
   })
   const { handleSubmit, control, formState: { errors }, setError } = useForm({
      resolver: yupResolver(schema)
   })

   const [fetchSendSecret] = useMutation(SEND_SECRET, {
      onError(err) {
         setError('field', { message: err.message })
      },

      update: (_, { data }) => {
         if (data.sendSecret) {
            setSuccess(true)
         }
      }
   })

   const onSubmit = async (data) => {
      await fetchSendSecret({
         variables: {
            input: data
         }
      })
   }

   return (
      <div className={s.form_cont}>
         {!success
            ? <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
               <Controller
                  control={control}
                  name='email'
                  defaultValue={''}
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        label={'Enter Your email'}
                     />
                  }}
               />
               <div className={s.button}>
                  <Button type='submit'>
                     Send
                  </Button>
               </div>
               {Object.values(errors).length > 0
                  && <FormErrors errors={Object.values(errors)} />}
            </form>
            : <Stack sx={{ width: '100%' }}>
               <Alert severity='success'>
                  <AlertTitle>
                     Success!
                  </AlertTitle>
                  <span className={s.alert_text}>
                     We sent a link to your email address, check it.
                  </span>
                  <Link to='/login' className={s.alert_link}>
                     Go to login.
                  </Link>
               </Alert>
            </Stack>}
      </div>
   )
}

export default PasswordForm