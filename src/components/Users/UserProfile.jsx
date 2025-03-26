import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router"
import updateOptions from "../../utils/updateOptions"
import Header from "../Main/Header";
import {fetchUserById} from "../../utils/fetch"

export default function UserProfile() {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [userReview, setUserReviews] = useState();
  const [userBookings, setUserBookings] = useState();
  const [userProperties, setUserProperties] = useState();

  // console.log(userReview)
  // console.log(userInfo)

  // console.log(userBookings)
  // console.log(userProperties)


  useEffect(() => {

    Promise.all([
      fetchUserById(id),
      fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/properties`, updateOptions()),
      fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/bookings`, updateOptions()),
      fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/reviews`, updateOptions())
    ])
      .then(res => {
        return Promise.all([
          res[0].json(), // [0]user
          res[1].json(), // [1]properties
          res[2].json(), // [2]bookings
          res[3].json()] // [3]reviews
        )
      })
      .then(data => {
        setIsLoading(false)
        setUserInfo(data[0].user)
        setUserProperties(data[1].properties)
        setUserBookings(data[2].bookings)
        setUserReviews(data[3].reviews)
      })
  }, [])

  if (isLoading) return (
    <>
      <title>User Profile</title>
      <Header />
      <div className="container">
        <h1>Loading user's info...</h1>
      </div>
    </>)

  return (
    <>
      <title>{userInfo.first_name}'s Profile</title>

      <Header />
      <section className="container">
        <h1 style={{ fontWeight: "bold", fontSize: "1.5em", textAlign: "center" }}>{userInfo.first_name}'s Profile</h1>
        <img src={userInfo.avatar} alt="" />
        <p>email: <span>{userInfo.email}</span></p>
        <p>first name: <span>{userInfo.first_name}</span></p>
        <p>lastname: <span>{userInfo.surname}</span></p>
        <p>phone number: <span>{userInfo.phone_number}</span></p>
        <p>role: <span>{userInfo.role}</span></p>
        <p>email: <span>{userInfo.email}</span></p>
      </section>
    </>

  )
}