import {Link} from 'react-router'

export default function PostReviewBtn({property_id}) {
  return (
    <Link 
    to={`/properties/${property_id}/post-review`}
    style={{margin: "30px auto", border: "1px solid black", padding: "10px 20px"}}>Post a Review</Link>
  )
  }
