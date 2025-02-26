import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from './Header'

export default function SingleProperty({ }) {
  const { property_id } = useParams()
  console.log(property_id)
  const [singleProperty, setSingleProperty] = useState("")

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}`)
      .then((res) => res.json())
      .then((data) => setSingleProperty(data.property))
  }, [])

  return (
    <>
    <Header />
      <div className='container'>

      <h2>{singleProperty.property_name}</h2>
      <img style={{ width: "200px" }} src={singleProperty.images} alt="" />
      <p>{singleProperty.description}</p>
    </div>
    </>
  )
}