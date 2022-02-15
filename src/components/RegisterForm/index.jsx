import React from 'react'
import s from './RegisterForm.module.css'
import { useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { SIGN_UP } from '../../graphql/users/mutations'
import { Link, useNavigate } from 'react-router-dom'
import FormErrors from '../FormErrors'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../Button'
import Input from '../Input'
import { useAuth } from '../../hooks/useAuth'

const RegisterForm = () => {
   const nav = useNavigate()
   const { regError, regReq, regSuccess } = useAuth()
   const [fetchSignUp] = useMutation(SIGN_UP)

   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is Required field'),
      username: Yup.string()
         .min(2, 'Username must have atleast 2 characters')
         .max(25, 'Username must have from 2 to 25 characters')
         .required('Username is required field'),
      password: Yup.string()
         .min(5, 'Password must have atleast 5 characters')
         .max(25, 'Password must have from 5 to 25 characters')
         .required('Password is Required field'),
      password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
   })

   const { handleSubmit, control, formState: { errors }, setError } = useForm({
      resolver: yupResolver(schema)
   })

   const onSubmit = async ({ password2, ...data }) => {
      try {
         regReq()
         const res = await fetchSignUp({
            variables: {
               input: data
            }
         })

         regSuccess(res.data?.signUp)
         nav('/')
      } catch (err) {
         setError('reg', { message: err.message })
         regError(err.message)
      }
   }

   return (
      <div className={s.window}>
         <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.inputs_cont}>
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        label={'Username'}
                        type={'text'}
                     />
                  }}
                  name='username'
                  control={control}
                  defaultValue=""
               />
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        label={'Email'}
                        type={'text'}
                     />
                  }}
                  name='email'
                  control={control}
                  defaultValue=""
               />
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        label={'Password'}
                        type={'password'}
                     />
                  }}
                  name='password'
                  control={control}
                  defaultValue=""
               />
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        {...fields}
                        label={'Confirm password'}
                        type={'password'}
                     />
                  }}
                  name='password2'
                  control={control}
                  defaultValue=""
               />
            </div>
            <div className={s.btn_cont}>
               <Button
                  type='submit'
               >
                  Sign In
               </Button>
            </div>
         </form>
         <div className={s.footer}>
            <span className={s.msg}>
               Have an account?
            </span>
            <Link className={s.sign_up} to='/login'>
               Sign In.
            </Link>
         </div>
         {Object.values(errors).length > 0
            && <FormErrors errors={Object.values(errors)} />}
      </div>
   )
}

export default RegisterForm