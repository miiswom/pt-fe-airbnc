import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router"
import Header from "../../Main/Header"
import { fetchPropertyById } from "../../../utils/fetch"
import Star from "../../../../styles/assets/star-svgrepo-com.svg"
import updateOptions from "../../../utils/updateOptions"

export default function PostReviewPage() {
  const { property_id } = useParams()
  const [property, setProperty] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [starCount, setStarCount] = useState(0)
  const [textareaVal, setTextAreaVal] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const stars = useRef(null);

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}`, updateOptions())
    .then(res => res.json())
      .then(({property}) => {
        setIsLoading(false)
        console.log(property)
        setProperty(property)
      })
  }, [property_id, stars, starCount])

  function countStars(e) {
    setStarCount(e.target.parentNode.id);
    if (stars !== null) {
      for (let star of stars.current.children) {
        if (star.id <= e.target.parentNode.id) {
          star.classList.remove("unchecked")
          star.classList.add("checked")
        } else {
          star.classList.add("unchecked")
        }
      }
    }
  }

  function postReview(e) {
    e.preventDefault()
    setIsSubmitted(true)

    if(starCount === 0) {
      alert("Please, rate the property.")
      setIsSubmitted(false)
      return 
    } 
    const comment = e.target[0].value;
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}/reviews`, updateOptions(     {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
        {
          guest_id: 1,
          rating: starCount,
          comment: comment
        }
      )
    })
)
    .then(res => res.json())
    .then(data => console.log(data))
    .then(() => {
      history.back()
    })
  }

  function handeTextareaVal(e) {
    setTextAreaVal((curr) => {
      curr = e.target.value
    return curr
  })
  }


  if (isLoading) return <p>Loading page...</p>
  return (
    <>
      <Header />
      <div className="container">
        <div className="container row">
          <img style={{ width: "20%" }} src={property.images} alt="" />
          <p style={{ width: "70%" }}>{property.description}</p>
        </div>
        <div className="container">
          <h1 style={{ textAlign: "center", fontSize: "1.5em", fontWeight: "bold" }}>Write a review for <span style={{fontStyle: "italic"}}>{property.property_name}</span></h1>
        </div>
      
        <form
          onSubmit={(e) => postReview(e)} className="container column" action="">
          <ul
          className="container row stars" ref={stars}>
            <li  id={1} 
            style={{width: "30px"}}
            onClick={(e) => countStars(e)}><img  src={Star} alt="star" /></li>
            <li id={2} 
            style={{width: "30px"}}
            onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
            <li id={3} 
            style={{width: "30px"}}
            onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
            <li id={4} 
            style={{width: "30px"}}
            onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
            <li id={5} 
            style={{width: "30px"}}
            onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
          </ul>
          <textarea required style={{ width: "95%", height: "300px", margin: "0 auto", padding: "10px", border: "1px solid grey", display: "block" }} type="text" placeholder="Write your review here..." 
          value={textareaVal}
          onChange={e => handeTextareaVal(e)}/>
          <button 
          className={!isSubmitted || starCount === 0 ? "btn" : "btn-disabled"}
          type="submit"
          disabled={isSubmitted || starCount === 0 ? true : false} 
          >Post Review</button>
        </form>
      </div>
    </>

  )
}

// create a list of 5 stars dinamically 
// have a class of checked
// if a star is clicked, check its position and apply a class of checked to all element below
/*

// useRef to store the li





*/