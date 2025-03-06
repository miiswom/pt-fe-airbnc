import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import Header from './Header'
import HeartImage from "../../styles/assets/noun-heart-full.svg";
import "../../styles/App.css"
import Expandable from './Expandable';
import ReviewsList from "./ReviewsList"

export default function SingleProperty() {
  const { property_id } = useParams()
  const [singleProperty, setSingleProperty] = useState("");
  const [favourited, setFavourited] = useState(false)

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}`)
      .then(res => res.json())
      .then(data => setSingleProperty(data.property))
  }, [])
  return (
    <>
      <Header />
      <div className='container property'>
        <h2 style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "20px" }}>{singleProperty.property_name}</h2>
        <img style={{ maxWidth: "60%", marginBottom: "20px" }} src={singleProperty.images} alt="" />
        <p style={{ fontSize: "1.3em", marginBottom: "20px" }}>{singleProperty.description}</p>
        <Expandable>
          <ReviewsList property_id={property_id}/>
        </Expandable>
      </div>
    </>)
}

// --- add a ul/li to display all images

// --- get simple design layout for SingleProperty
// --- get reviews button under the propertpy details
// --- this opens a div with all properties 
// --- how to use composition for hide / show reviews ? 
// // UTC timezone in database

// get all the dates of a property
// turn list of dates / ranges as a view
// third party component Date picker // MUI Date picker ---- Date range picker (calendar week picker)
// manipulate the data for view

// submit a form 
// test with TDD to break it down

// to visualize 
// utils fuction. to turn dates into manageable to manipulate
// --- how would you handle the bookings: dates in JavaScript

// chiildren: reviews list
