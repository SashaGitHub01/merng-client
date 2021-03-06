
class LocalStorage {
   getToken = () => {
      return localStorage.getItem('token')
   }

   setToken = (token) => {
      localStorage.setItem('token', token)
   }

   removeToken = () => {
      localStorage.removeItem('token')
   }

}

export const storage = new LocalStorage()