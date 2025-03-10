import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from './Header'
import HeartImage from "../../styles/assets/heart-svgrepo-com.svg";
import "../../styles/App.css"
import Expandable from './Expandable';
import ReviewsList from "./ReviewsList"

export default function SingleProperty() {
  const { property_id } = useParams()
  const [singleProperty, setSingleProperty] = useState("");
  const [isFavourited, setIsFavourited] = useState(false)

  // fetching the single property data
  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}`)
      .then(res => res.json())
      .then(data => setSingleProperty(data.property))
  }, [])

  // fetching all favourites and check if 'favourited' className should be applied
  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/favourite`)
      .then(res => res.json())
      .then(data => {
        for (let item of data.favourites) {
          if (item.property_id === Number(property_id) && item.guest_id === 1) {
            setIsFavourited(true)
          } else {
            setIsFavourited(false)
          }
        }
      })
  }, []);

  // onClick, toggle 'favourite' class and DELETE or POST a favourite
  function toggleFavourite(e) {
    if (isFavourited) {
      e.target.classList.toggle("favourited")
      fetch(`https://pt-be-airbnc.onrender.com/api/favourite`)
        .then(res => res.json())
        .then(data => {
          for (let item of data.favourites) {
            if (item.guest_id === 1 && item.property_id) {
              fetch(`https://pt-be-airbnc.onrender.com/api/favourite/${item.favourite_id}`,
                {
                  method: "DELETE"
                }).then(() => {
                  alert("Property successfully unfavourited.")
                  setIsFavourited(false)
                })
            }
          }
        })
    } else if (!isFavourited) {
      e.target.classList.toggle("favourited")
      fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}/favourite`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ guest_id: 1 })
        })
        .then(res => res.json())
        .then(data => {
          setIsFavourited(true)
          alert(data.msg)
        }
        )
    }
  }

  return (
    <>
      <Header />
      <div className='container property'>
        <h2 style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "20px" }}>{singleProperty.property_name}</h2>
        <a><img onClick={(e) => toggleFavourite(e)} className={isFavourited ? "favourited" : null} style={{ width: "40px" }} src={HeartImage} alt="" /></a>
        <img style={{ maxWidth: "60%", marginBottom: "20px" }} src={singleProperty.images} alt="" />
        <p style={{ fontSize: "1.3em", marginBottom: "20px" }}>{singleProperty.description}</p>
        <Expandable>
          <ReviewsList property_id={property_id} />
        </Expandable>
      </div>
    </>)
}


