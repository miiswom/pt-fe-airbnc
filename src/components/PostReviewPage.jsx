import { useEffect, useState, useRef} from "react"
import { useParams } from "react-router"
import Header from "./Header"
import { fetchPropertyById } from "../utils/fetch"
import Star from "../../styles/assets/star-svgrepo-com.svg"

export default function PostReviewPage() {
  const { property_id } = useParams()
  const [property, setProperty] = useState()
  const [isLoading, setIsLoading] = useState(true)
  // const start = Array.fill()
  const stars = useRef(null)
  // console.log("property_id", property_id)
  // console.log("stars", stars)

  useEffect(() => {
    fetchPropertyById(property_id)
      .then(property => {
        setIsLoading(false)
        setProperty(property)})
  }, [property_id, stars])
  // console.log(property)


  function countStars(e) {
    let starCount = e.target.parentNode.id;
    console.log("starCount", starCount)
    // for(let i=0; i < stars.length; i++) {
    //   if(starCount) {
    //     stars[i].classList.toggle('checked')
    //     starCount = i
    //   } 
    
    //   if(stars[i] < starCount) {
    //     stars[i].className = 'checked'
    //   }
    // }
    if(stars !== null) {
      console.log("star", stars.current.children.length)
      // for(let i=0; i < starCount; i++) {
        for(let star of stars.current.children) {
          if(star.id <= starCount) {
            console.log(star)
            star.className ="checked"

          } else {
            star.className = "unchecked"
          }
        // }
      }
    }
    
  }

  if(isLoading) return <p>Loading page...</p>
  return (
    <>
    <Header />
    <div className="container">
      <div className="container row">
        <img style={{ width: "20%" }} src={property.images} alt="" />
        <p style={{ width: "70%" }}>{property.description}</p>
      </div>
      <div className="container">
        <h1 style={{ textAlign: "center", fontSize: "1.5em", fontWeight: "bold" }}>Post a review for {property.property_name}</h1>
      </div>

      <form action="">
        <ul className="container row stars" ref={stars}>
          <li id={1} onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
          <li id={2} onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
          <li id={3} onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
          <li id={4} onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
          <li id={5} onClick={(e) => countStars(e)}><img src={Star} alt="star" /></li>
        </ul>
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