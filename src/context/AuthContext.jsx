import { createContext, useEffect, useState } from "react";
import { ApiGetCurrentAccountRole } from "../api/User/ApiAuthentication";
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({});
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await ApiGetCurrentAccountRole();
            setAuth({
               roleName: response.roleName,
            })
          
         } catch (error) {
            console.log('Not authenticated');
            setAuth({
               roleName: 'Guest'
            })
         } finally {
            setLoading(false)
         }
      }

      fetchUser()
   }, [])

   return (
      <AuthContext.Provider value={{ auth, setAuth}}>
         {!loading && children}
      </AuthContext.Provider>
   )
}
export default AuthProvider