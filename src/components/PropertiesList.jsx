
import '../../styles/App.css'
import { Link } from 'react-router'

export default function PropertiesList({properties}) {

  return (
    <ul className="grid-container">
      {properties.map((property) => {
        return <li key={property.property_id}>
          <p>{property.property_id}</p>
          <h2>{property.property_name}</h2>
          <p>{property.property_type}</p>
          <Link to={`/properties/${property.property_id}`}><img style={{maxWidth: "300px"}}src={property.image} alt="" /></Link>
          <p>{property.price_per_night}</p>
        </li>
      })}
    </ul>
  )
}