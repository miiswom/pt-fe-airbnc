import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router"
import updateOptions from "../../utils/updateOptions"
import Header from "../Main/Header";
import { fetchUserById } from "../../utils/fetch"

export default function UserProfile() {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [userReview, setUserReviews] = useState();
  const [userBookings, setUserBookings] = useState();
  const [userProperties, setUserProperties] = useState();

  console.log(userReview)
  console.log(userInfo)
  console.log(userBookings)
  console.log(userProperties)


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

  useEffect(() => {

  })

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
        {/*block 1: 
          - host avatar, first_name, surname, role
          - total num of reviews received for all properties
          - average rating (counting all properties)
          - total num of properties listed
          - member since (created_at)*/}
        <div className="container row user-card">
          <div style={{ width: "200px" }}>
            <img style={{ maxWidth: "100%" }} src={userInfo.avatar} alt="" />
          </div>
          <div className="column user-card-info">
            <h2 style={{fontSize: "1.3em"}}>{userInfo.first_name} {userInfo.surname}</h2>
            <p>Reviews received: __</p>
            <p>Average rating: __ </p>
            <p>Properties listed: {userProperties.length}</p>
          </div>

        </div>

        <p>email: <span>{userInfo.email}</span></p>
        <p>lastname: <span>{userInfo.surname}</span></p>
        <p>phone number: <span>{userInfo.phone_number}</span></p>
        <p>role: <span>{userInfo.role}</span></p>
        <p>email: <span>{userInfo.email}</span></p>
      </section>
    </>

  )
}