import { useEffect } from "react"
import { fetchProtectedRoute } from "../../utils/fetch"
export default function ProtectedRoute() {

  useEffect(()=> {
    fetchProtectedRoute()
  }, [])
  
  return (
    <title>
      Redirecting...
    </title>
  )
}