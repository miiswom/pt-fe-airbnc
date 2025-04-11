import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../Main/Header'
import Expandable from '../Expandable';
import ReviewsList from "./Reviews/ReviewsList"
import FavouriteBtn from './Favourite/FavouriteBtn';
import Calendar from './Bookings/Calendar';
import { fetchFavourites, fetchPropertyById } from '../../utils/fetch';
import ImageCarrousel from './ImageCarrousel';

export default function SingleProperty() {
  const { property_id } = useParams()
  const [singleProperty, setSingleProperty] = useState("");
  const [isFavourited, setIsFavourited] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // fetching the single property data
  useEffect(() => {
    fetchPropertyById(property_id)
      .then(property => {
        setIsLoading(false)
        setSingleProperty(property)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isLoading])

  // fetching all favourites and check if 'favourited' className should be applied
  useEffect(() => {
    fetchFavourites()
      .then(favourites => {
        for (let item of favourites) {
          item.property_id === Number(property_id) && item.guest_id === 1 ? setIsFavourited(true) : setIsFavourited(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);
  if (isLoading) return (
    <>
      <Header />
      <div className="container">
        <h1>Loading property info...</h1>
      </div>
    </>)  
    return (
    <>
      <Header />
      <div className='container property'>
        <h2 className="text-3xl font-bold underline" style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "20px" }}>{singleProperty.property_name}</h2>
        <FavouriteBtn
          property_id={property_id}
          isFavourited={isFavourited}
          setIsFavourited={setIsFavourited} />
        <ImageCarrousel properties={singleProperty.images} />
        <p style={{ marginTop: "50px", fontSize: "1.3em", marginBottom: "20px" }}>{singleProperty.description}</p>
        <div className="container expandables" style={{justifyContent: "space-around", }}>
          <div>
          <Expandable text="Reviews">
            <ReviewsList property_id={property_id} />
          </Expandable>
          </div>
          <div>
          <Expandable text="Booking Section" className="column" style={{width: "50%"}}>
            <Calendar property_id={property_id}/>
          </Expandable>
          </div>
        </div>
      </div>
    </>)
}


