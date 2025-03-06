import { useEffect, useState } from "react";

export default function ReviewsList({ property_id }) {
  const [reviewsList, setReviewsList] = useState([])

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}/reviews`)
      .then(res => res.json())
      .then(data => setReviewsList(data.reviews))
  }, [])

  console.log(reviewsList)
  return (
    <ul className="container" style={{ width: "80%" }}>
      {reviewsList.map((review) => {
        return <li className="column reviews" key={review.review_id}>
          <img src={review.guest_avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="" />
          <p>{review.rating}<span>⭐</span> | <span style={{ fontWeight: "bold" }}>{review.guest}</span></p>
          <p style={{ fontWeight: "bold" }}>Posted on {review.created_at.slice(0, 10)}</p>
          <p>{review.comment}</p>
        </li>
      })}

    </ul>
  )
}