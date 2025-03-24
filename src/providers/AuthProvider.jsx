import { AuthContext } from "../contexts/AuthContext";
import { useCallback, useState, useMemo } from "react";
import updateOptions from "../utils/updateOptions";

export default function AuthProvider({ children }) {

  const data = "hello";
  const [status, setStatus] = useState(false);

  const [currentUser, setCurrentUser] = useState()
  // use state to store the user
  // send setUser to signin to retrieve user info if successful login
  // store the user info as data 

  const signin = useCallback((id) => {
    fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}`, updateOptions())
      .then(res => res.json())
      .then(data => {
          setCurrentUser(data);
          setStatus(true)
      })
      .catch(err => console.log(err))
  }, []);

  const authValue = useMemo(() => ({
    currentUser,
    signin,
    status
  }), [currentUser, status])

  return <AuthContext.Provider value={authValue}>
    {children}
  </AuthContext.Provider>
}