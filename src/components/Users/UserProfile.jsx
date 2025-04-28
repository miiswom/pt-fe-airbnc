import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router"
import updateOptions from "../../utils/updateOptions"
import Header from "../Main/Header";
import { fetchPropertyById, fetchUserById } from "../../utils/fetch"
import PropertiesCarrousel from "../PropertiesCarrousel"
import PropertyReviewsCarrousel from "../PropertyReviewsCarrousel"

export default function UserProfile() {
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [userReviews, setUserReviews] = useState();
  const [userBookings, setUserBookings] = useState();
  const [userProperties, setUserProperties] = useState();

  //console.log(userReview)
  console.log("userInfo", userInfo)
  console.log("userBookings", userBookings)
  console.log("userProperties", userProperties)
  console.log("userReviews", userReviews)
  // console.log(userProperties.length)

  useEffect(() => {
    fetchUserById(id)
    .then(res=>res.json())
    .then(data => {
      setIsLoading(false)
      setUserInfo(data.user)
    }) 
    // Promise.all([
    //   fetchUserById(id),
    //   fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/properties`, updateOptions()),
    //   fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/bookings`, updateOptions()),
    //   fetch(`https://pt-be-airbnc.onrender.com/api/users/${id}/reviews`, updateOptions())
    // ])
    //   .then(res => {
    //     return Promise.all([
    //       res[0].json(), // [0]user
    //       res[1].json(), // [1]properties
    //       res[2].json(), // [2]bookings
    //       res[3].json() // // [3]reviews
    //     ]
    //     )
    //   })
    //   .then(data => {
    //     setIsLoading(false)
    //     setUserInfo(data[0].user)
    //     setUserProperties(data[1].properties)
    //     setUserBookings(data[2].bookings)
    //     setUserReviews(data[3].reviews)
    //   })
    //   .then(() => {
    //   })
  }, [])

  // useEffect(() => {

  //   if(userProperties) {
  //    Promise.all([
  //       userProperties.map((prop) => {
  //         console.log(prop.property_id)
  //         return fetchPropertyById(Number(prop.property_id))
  //       })
  //     ])
  //     .then(data => data)

  //   }
  // Promise.all([fetchPropertyById(userProperties[0].property_id),
  // ])
  //}, [userProperties])

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
        <h1 style={{ fontWeight: "bold", fontSize: "1.5em", textAlign: "center" }}><span style={{ textTransform: "capitalize" }}>{userInfo.role} profile: </span>{userInfo.first_name} {userInfo.surname} </h1>
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
          <div className="column user-card-info" style={{ width: "30%", margin: "0 auto" }}>
            {/* <p>Reviews received: __</p>
            <p>Average rating: __ </p> */}
            <p>Status: {userInfo.role}</p>
            {/*<p>Properties listed: {userProperties.length}</p>*/}
          </div>
        </div>

        {/*block 2 
        - few random reviews kinda caroussel*
        */}
        <div></div>

        {/*block 3
          - host's confirmed information (to be listed if true)
          - host information (email, phone number) 
        */}

        {/*block 4
        - - properties listings kinda carousel* 
        */}
        {/* <section className="container">
          <h2 style={{ textAlign: "center", fontSize: "1.3em", fontWeight: "bold", marginBottom: "10px" }}>Property listings:</h2>
          <PropertiesCarrousel properties={userProperties} />
        </section> */}

        {/* <PropertyReviewsCarrousel properties={userProperties} /> */}

      </section>
    </>

  )
}

{/*
          <section className="container" style={{ padding: "20px 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.3em", fontWeight: "bold", marginBottom: "10px" }}>Confirmed information:</h2>
          <p>{userInfo.email ? "✔️ Verified email address" : null}</p>
          <p>{userInfo.phone_number ? "✔️ Verified phone number" : null}</p>
        </section>
  */}