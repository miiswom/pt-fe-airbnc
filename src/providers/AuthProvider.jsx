import { AuthContext } from "../contexts/AuthContext";
import { useCallback, useState, useMemo, useEffect } from "react";
import updateOptions from "../utils/updateOptions";

export default function AuthProvider({ children }) {
  let user = localStorage.getItem('currentUser')
  const [currentUser, setCurrentUser] = useState(user)

  const signin = useCallback((id)=>{
    fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/`, updateOptions())
    .then(res => res.json())
    .then(data => {
      // if(!user) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        user = localStorage.getItem('currentUser');
      // } 
      setCurrentUser(user)
      return { success: true}
    })
  },[])
  
  const authVal = useMemo(()=>({
    currentUser,
    signin
  }), [user])
  return (<AuthContext.Provider value={authVal}>
    {children}
  </AuthContext.Provider>)
}