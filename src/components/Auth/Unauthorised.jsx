import { useEffect } from "react"
import { fetchProtectedRoute } from "../../utils/fetch"
export default function Unauthorised() {

  useEffect(()=> {
    fetchProtectedRoute()
  }, [])
  
  return (
    <title>
      Redirecting...
    </title>
  )
}