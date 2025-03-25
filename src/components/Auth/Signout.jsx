import { useEffect } from "react"

export default function Signout() {
  useEffect(()=>{
    localStorage.removeItem('jsonwebtoken')
    localStorage.removeItem('currentUser')
    location.assign("/")
  },[])
  return ( 
    <p>Signing out....</p>
  )
}