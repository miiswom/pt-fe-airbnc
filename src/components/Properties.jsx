import { useState, useEffect } from "react"
import axios from 'axios';
import "../../styles/App.css";
import Header from "./Header";
import PropertiesList from "./PropertiesList";

export default function Properties({setSort, sort, searchParams, setSearchParams, setPropTypeFilter, propTypeFilter}) {
  const [properties, setProperties] = useState([])
  // console.log("properties", properties)
  // console.log("properties sort", sort)
  // console.log("properties propTypeFilter", propTypeFilter)
  // console.log("properties propTypeFilter length", propTypeFilter.length)


  useEffect(()=>{
    fetch(`https://pt-be-airbnc.onrender.com/api/properties?sort=${sort}`)
    .then((res) => res.json())
    .then((data) => {
      const ids = []
      const props = []
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
      if(propTypeFilter.length > 0) {
        const filtered = props.filter((prop) => prop.property_type === propTypeFilter)
        setProperties(filtered)
        // searchParams.get()
      } else {
        setProperties(props)
      }
    })
  }, [sort, propTypeFilter])

  return (
    <>
    <Header 
    setSort={setSort} 
    sort={sort} 
    searchParams={searchParams}
    setSearchParams={setSearchParams}

    setPropTypeFilter={setPropTypeFilter}
    propTypeFilter={propTypeFilter}/>
    <div className="container">
      <PropertiesList properties={properties} propTypeFilter={propTypeFilter}/>
    </div>
    </>
  )
}