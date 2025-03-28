
import '../../../styles/App.css'
import { Link } from 'react-router'

export default function PropertiesList({ properties }) {
  // console.log("properties", properties)
  return (
    <ul className="grid-container">
      {properties.map((property) => {
        return <li className="property-card" key={property.property_id}>
          <Link to={`/properties/${property.property_id}`}><img className="property-card-img" style={{ maxWidth: "300px" }} src={property.images[0]} alt="" /></Link>
          {/* <p>{property.property_id}</p> */}
          <h2 style={{margin: "8px auto", fontSize: "1.2em"}}>{property.property_name}</h2>
          {/* <p>{property.property_type}</p> */}
          <p>GBP {property.price_per_night} night</p>
        </li>
      })}
    </ul>
  )
}