import { useEffect } from "react"
import Header from "../Main/Header"

export default function Signout() {
  
  useEffect(()=>{
    localStorage.removeItem('jsonwebtoken')
    localStorage.removeItem('currentUser')
    location.assign("/")
  },[])
  
  return ( 
      <>
        <Header />
        <div className="container">
          <h1>Signing out..</h1>
        </div>
      </>
  )
}