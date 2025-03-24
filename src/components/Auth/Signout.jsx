import { useEffect } from "react"

export default function Signout() {
  useEffect(()=>{
    localStorage.removeItem('jsonwebtoken')
    location.assign("/")
  },[])
  return ( 
    <p>Signing out....</p>
  )
}