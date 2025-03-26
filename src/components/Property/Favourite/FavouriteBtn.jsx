import HeartImage from "../../../../styles/assets/heart-svgrepo-com.svg";
import { useAuth } from "../../../contexts/AuthContext";
import updateOptions from "../../../utils/updateOptions";

export default function FavouriteBtn({ property_id, isFavourited, setIsFavourited }) {
  const val = useAuth()
  console.log("vaaal", val)
  // onClick, toggle 'favourite' class and DELETE or POST a favourite
  function toggleFavourite(e) {

    if (isFavourited) {
      fetch(`https://pt-be-airbnc.onrender.com/api/favourite`)
        .then(res => res.json())
        .then(data => {
          for (let item of data.favourites) {
            if (item.guest_id === 1 && item.property_id) {
              fetch(`https://pt-be-airbnc.onrender.com/api/favourite/${item.favourite_id}`, updateOptions({
                method: "DELETE"
              })
                ).then(() => {
                  alert("Property successfully unfavourited.")
                  e.target.classList.toggle("favourited")
                  setIsFavourited(false)
                })
            }
          }
        })
    } else if (!isFavourited) {
      fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}/favourite`, updateOptions({
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ guest_id: 1 })
      }))
        .then(res => res.json())
        .then(data => {
          if(data.msg.startsWith('Booking')) {
            setIsFavourited(true)
            alert(data.msg)
            e.target.classList.toggle("favourited")
          } else {
            return
          }
          
        }
        )
    }
  }
  return (
    <a><img onClick={(e) => toggleFavourite(e)} className={isFavourited ? "favourited" : null} style={{ width: "40px", margin: "10px auto"}} src={HeartImage} alt="" /></a>
  )
}