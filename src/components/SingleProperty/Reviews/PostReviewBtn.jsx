import {Link} from 'react-router'

export default function PostReviewBtn({property_id}) {
  return (
    <Link 
    to={`/properties/${property_id}/post-review`}
    className='btn'
    style={{width: "250px"}}
    >Write a Review</Link>
  )
  }
