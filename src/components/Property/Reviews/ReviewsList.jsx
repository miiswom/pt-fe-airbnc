import { useEffect, useState, useContext} from "react";
import { fetchReviewsByPropertyId } from "../../../utils/fetch";
import PostReviewBtn from "./PostReviewBtn";
import { Link } from "react-router";
import Button from "../../Button";

export default function ReviewsList({ property_id }) {
  const [reviewsList, setReviewsList] = useState([])

  // fetch the reviews by property_id
  useEffect(() => {
    fetchReviewsByPropertyId(property_id)
      .then(reviews => setReviewsList(reviews))
  }, [])


  return (
    < div className=" reviewList">
     <ul >
      {reviewsList.map((review) => {
        return (
          <li className="column reviewItem" key={review.review_id}>
          <Link to={localStorage.jsonwebtoken ?`/users/${review.user_id}` : "/unauthorised"}><img src={review.guest_avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="" /></Link>
          <p>{review.rating}<span>⭐</span> | <span style={{ fontWeight: "bold" }}>{review.guest}</span></p>
          <p style={{ fontWeight: "bold" }}>Posted on {review.created_at.slice(0, 10)}</p>
          <p>{review.comment}</p>
        </li>
        )
      })}
            <Button>
              <Link to={localStorage.jsonwebtoken ? `/properties/${property_id}/post-review` : `/unauthorised/`}>
              Write a review
              </Link>
          </Button>
    </ul>
    </div >
   

  )
}