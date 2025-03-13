import { useEffect, useState } from "react";
import { fetchReviewsByPropertyId } from "../utils/fetch";
import PostReviewBtn from "./PostReviewBtn";

export default function ReviewsList({ property_id }) {
  const [reviewsList, setReviewsList] = useState([])

  // fetch the reviews by property_id
  useEffect(() => {
    fetchReviewsByPropertyId(property_id)
      .then(reviews => setReviewsList(reviews))
  }, [])

  return (
    <ul className="container reviewList" style={{ width: "80%" }}>
      {reviewsList.map((review) => {
        return <li className="column reviewItem" key={review.review_id}>
          <img src={review.guest_avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="" />
          <p>{review.rating}<span>⭐</span> | <span style={{ fontWeight: "bold" }}>{review.guest}</span></p>
          <p style={{ fontWeight: "bold" }}>Posted on {review.created_at.slice(0, 10)}</p>
          <p>{review.comment}</p>
        </li>
      })}
          <PostReviewBtn property_id={property_id}/>
    </ul>
  )
}