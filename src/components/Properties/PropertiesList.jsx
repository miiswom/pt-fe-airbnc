
import '../../../styles/App.css'
import { Link } from 'react-router'

export default function PropertiesList({ properties }) {
  return (
    <ul className="grid-container">
      {properties.map((property) => {
        return <li className="property-card" key={property.property_id}>
          <Link to={`/properties/${property.property_id}`}><img className="property-card-img" style={{ maxWidth: "300px" }} src={property.images[0]} alt="" /></Link>
          <h2 style={{margin: "8px auto", fontSize: "1.2em"}}><Link to={`/properties/${property.property_id}`}>{property.property_name}</Link></h2>
          <p>GBP {property.price_per_night} / night</p>
        </li>
      })}
    </ul>
  )
}