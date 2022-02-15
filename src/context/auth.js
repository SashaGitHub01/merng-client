import React, { createContext, useReducer } from "react";
import { storage } from '../utils/storage'

const FETCH_LOGIN = 'FETCH_LOGIN'
const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR'
const FETCH_REGISTER = 'FETCH_REGISTER'
const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS'
const FETCH_REGISTER_ERROR = 'FETCH_REGISTER_ERROR'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const LOGOUT = 'LOGOUT'
const FETCH_LIKES_SUCCESS = 'FETCH_LIKES_SUCCESS'
const ADD_LIKE = 'ADD_LIKE'
const REMOVE_LIKE = 'REMOVE_LIKE'

const initialState = {
   user: null,
   likes: [],
   isFetching: false,
   isInitialized: false,
   error: null,
}

export const authContext = createContext({
   ...initialState,
   addLike: (data) => { },
   removeLike: (data) => { },
   logout: () => { },
   loginReq: () => { },
   loginSuccess: (data) => { },
   loginError: (data) => { },
   regSuccess: (data) => { },
   regError: (data) => { },
   regReq: () => { },
   authSuccess: (data) => { },
   authError: (data) => { },
   likesSuccess: (data) => { },
})

const authReducer = (state, action) => {
   switch (action.type) {
      case FETCH_LIKES_SUCCESS:
         return {
            ...state,
            likes: action.payload,
         }

      case FETCH_LOGIN:
         return {
            ...state,
            isFetching: true,
         }

      case ADD_LIKE:
         return {
            ...state,
            likes: [...state.likes, action.payload]
         }

      case REMOVE_LIKE:
         return {
            ...state,
            likes: state.likes.filter((like) => {
               return like.id !== action.payload
            })
         }

      case FETCH_LOGIN_SUCCESS:
         return {
            ...state,
            isFetching: false,
            user: action.payload,
            error: null
         }

      case FETCH_LOGIN_ERROR:
         return {
            ...state,
            user: null,
            isFetching: false,
            error: action.payload
         }

      case FETCH_REGISTER:
         return {
            ...state,
            isFetching: true,
         }

      case FETCH_REGISTER_SUCCESS:
         return {
            ...state,
            isFetching: false,
            user: action.payload,
            error: null
         }

      case FETCH_REGISTER_ERROR:
         return {
            ...state,
            user: null,
            isFetching: false,
            error: action.payload
         }

      case AUTH_SUCCESS:
         return {
            ...state,
            user: action.payload,
            error: null,
            isInitialized: true
         }

      case AUTH_ERROR:
         return {
            ...state,
            user: null,
            isInitialized: true
         }

      case LOGOUT:
         return {
            ...state,
            user: null,
            error: null,
            isInitialized: true,
            isFetching: false,
            likes: []
         }

      default:
         return state
   }
}

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialState)

   const likesSuccess = (data) => {
      dispatch({ type: FETCH_LIKES_SUCCESS, payload: data })
   }

   const loginReq = () => {
      dispatch({ type: FETCH_LOGIN })
   }

   const loginSuccess = (data) => {
      const { token, ...user } = data;
      storage.setToken(token)
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: user })
   }

   const loginError = (err) => {
      dispatch({ type: FETCH_LOGIN_ERROR, payload: err })
   }

   const regSuccess = (data) => {
      const { token, ...user } = data;
      storage.setToken(token)
      dispatch({ type: FETCH_REGISTER_SUCCESS, payload: user })
   }

   const regError = (data) => {
      dispatch({ type: FETCH_REGISTER_ERROR, payload: data })
   }

   const regReq = () => {
      dispatch({ type: FETCH_REGISTER })
   }

   const authSuccess = (data) => {
      dispatch({ type: AUTH_SUCCESS, payload: data })
   }

   const authError = (data) => {
      dispatch({ type: AUTH_ERROR, payload: data })
   }

   const logout = () => {
      storage.removeToken()
      dispatch({ type: LOGOUT })
   }

   const addLike = (data) => {
      dispatch({ type: ADD_LIKE, payload: data })
   }

   const removeLike = (data) => {
      dispatch({ type: REMOVE_LIKE, payload: data })
   }

   return (
      <authContext.Provider value={{
         ...state,
         addLike,
         removeLike,
         likesSuccess,
         logout,
         loginReq,
         loginSuccess,
         loginError,
         regSuccess,
         regError,
         regReq,
         authSuccess,
         authError,
      }}>
         {children}
      </authContext.Provider>
   )
}