import React from 'react'
import Button from '../Button'
import Input from '../Input'
import { Link, useNavigate } from 'react-router-dom'
import s from './LoginForm.module.css'
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../hooks/useAuth'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../../graphql/users/mutations'
import FormErrors from '../FormErrors'

const LoginForm = () => {
   const nav = useNavigate()
   const { loginReq, loginError, loginSuccess } = useAuth();
   const [fetchSignIn] = useMutation(SIGN_IN, {
      onError: (err) => {
         setError('error', { message: err.message })
      }
   })

   const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is Required field'),
      password: Yup.string()
         .min(5, 'Password must have atleast 5 characters')
         .required('Password is Required field'),
   })

   const { handleSubmit, control, formState: { errors }, setError } = useForm({
      resolver: yupResolver(schema)
   })

   const onSubmit = async (data) => {
      try {
         loginReq()
         const res = await fetchSignIn({
            variables: {
               input: data
            }
         })

         loginSuccess(res.data.signIn)
         nav('/')
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className={s.window}>
         <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.inputs_cont}>
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        autoFocus={true}
                        label={'Email'}
                        type={'text'}
                        {...fields}
                     />
                  }}
                  name='email'
                  control={control}
                  defaultValue=""
               />
               <Controller
                  render={({ field: { ref, ...fields } }) => {
                     return <Input
                        label={'Password'}
                        type={'password'}
                        {...fields}
                     />
                  }}
                  name='password'
                  control={control}
                  defaultValue=""
               />
               <div className={s.pswd}>
                  <Link to='/password'>
                     Forgot password?
                  </Link>
               </div>
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
               Don't have an account?
            </span>
            <Link className={s.sign_up} to='/register'>
               Sign Up.
            </Link>
         </div>
         {Object.values(errors).length > 0
            && <FormErrors errors={Object.values(errors)} />}
      </div>
   )
}

export default LoginForm