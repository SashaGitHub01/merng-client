import { useContext } from "react";
import { authContext } from "../context/auth";

export const useAuth = () => {
   return useContext(authContext)
}