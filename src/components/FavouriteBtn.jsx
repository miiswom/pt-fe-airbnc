import HeartImage from "../../styles/assets/heart-svgrepo-com.svg";

export default function FavouriteBtn({ property_id, isFavourited, setIsFavourited }) {

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
    <a><img onClick={(e) => toggleFavourite(e)} className={isFavourited ? "favourited" : null} style={{ width: "40px", margin: "10px auto"}} src={HeartImage} alt="" /></a>
  )
}