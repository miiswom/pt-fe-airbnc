import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from './Header'
import "../../styles/App.css"
import Expandable from './Expandable';
import ReviewsList from "./ReviewsList"
import FavouriteBtn from './FavouriteBtn';
import BookingSection from './BookingSection';
import { DatePicker } from '@mui/x-date-pickers';


export default function SingleProperty() {
  const { property_id } = useParams()
  const [singleProperty, setSingleProperty] = useState("");
  const [isFavourited, setIsFavourited] = useState(false);
  const [value, setValue] = useState()

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

  return (
    <>
      <Header />
      <div className='container property'>
        <h2 style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "20px" }}>{singleProperty.property_name}</h2>
        <FavouriteBtn
          property_id={property_id}
          isFavourited={isFavourited}
          setIsFavourited={setIsFavourited} />
        <img style={{ maxWidth: "60%", marginBottom: "20px" }} src={singleProperty.images} alt="" />
        <p style={{ fontSize: "1.3em", marginBottom: "20px" }}>{singleProperty.description}</p>
        
        <Expandable>
          <BookingSection>
            <DatePicker/>
          </BookingSection>
        </Expandable>
        
        <Expandable>
          <ReviewsList property_id={property_id} value={["Reviews"]} />
        </Expandable>
      </div>
    </>)
}


