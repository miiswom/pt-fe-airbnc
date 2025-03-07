import { useState, useEffect } from "react"
import axios from 'axios';
import "../../styles/App.css";
import Header from "./Header";
import PropertiesList from "./PropertiesList";
import Toolbar from "./Toolbar";

export default function Properties({setSort, sort, searchParams, setSearchParams, property_type}) {
  const [properties, setProperties] = useState([])
  // console.log("properties", property_type)
  // console.log("properties", properties)
  // console.log("properties sort", sort)

  useEffect(()=>{
    fetch(`https://pt-be-airbnc.onrender.com/api/properties?sort=${sort}`)
    .then((res) => res.json())
    .then((data) => {
      const ids = []
      const props = []
      // removing the duplicate properties by id 
      data.properties.map((property) => {
        if(!ids.includes(property.property_id)) {
          ids.push(property.property_id)
          props.push(property)
        }
      })
      props.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : 1
      }
    )
    // using the property_type params
      if(property_type.length > 0) {
        const filtered = props.filter((prop) => prop.property_type.toLowerCase() === property_type)
        console.log("filtered?", filtered)
        setProperties(filtered)
        // setSearchParams({property_type: property_type})
        // searchParams.get()
      } else {
        setProperties(props)
      }
    })
  }, [sort, property_type])

  return (
    <>
    <Header 
    setSort={setSort} 
    sort={sort} 
    searchParams={searchParams}
    setSearchParams={setSearchParams}
    />
    <Toolbar 
    setSort={setSort} 
    sort={sort} 
    searchParams={searchParams}
    setSearchParams={setSearchParams}
    property_type={property_type}
    />
    <div className="container">
      <PropertiesList 
      properties={properties} />
    </div>
    </>
  )
}