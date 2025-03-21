import { useState, useEffect } from "react"
import "../../../styles/App.css";
import Header from "../Header";
import PropertiesList from "./PropertiesList";
import Toolbar from "../Toolbar";

export default function Properties({ setSortValue, sortValue, searchParams, setSearchParams, property_type, max_price, maxPriceRangeVal, setMaxPriceRangeVal }) {
  const [properties, setProperties] = useState([])
  // console.log("property_type II", property_type)
  
  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties?sort=${sortValue}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data)
        const ids = []
        const props = []
        // removing the duplicate properties by property_id 
        data.properties.map((property) => {
          if (!ids.includes(property.property_id)) {
            ids.push(property.property_id)
            props.push(property)
          }
        })
        props.sort((a, b) => {
          return a[sortValue] < b[sortValue] ? 1 : 1
        }
        )
        // console.log("props", props)

        // using the property_type params to filter
        if (property_type === "" || property_type === undefined || property_type === null) {
          // console.log("fdgjfdskjndfskj")
          if (Number(max_price) < 400) {
            // console.log("filteredProps max_price")
            // console.log("max_price III", max_price)

            const filteredPropssss = props.filter((prop) => Number(prop.price_per_night) <= Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(props)
          }
        } else if (property_type.length > 0) {
          // console.log("filteredProps")
          // console.log("property_type III", property_type)

          const filteredProps = props.filter((prop) => prop.property_type === property_type)
          if (Number(max_price) < 400) {
            // console.log("filteredProps max_price")
            // console.log("max_price III", max_price)

            const filteredPropssss = filteredProps.filter((prop) => Number(prop.price_per_night) < Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(filteredProps)
          }
        } else {
          setProperties(props)
        }

        // using the max_price params to filter

      })
  }, [property_type, max_price])

  return (
    <>
      <Header
        setSortValue={setSortValue}
        sortValue={sortValue}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Toolbar
        setSortValue={setSortValue}
        sortValue={sortValue}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        property_type={property_type}
        maxPriceRangeVal={maxPriceRangeVal}
        setMaxPriceRangeVal={setMaxPriceRangeVal}
      />
      <div className="container">
        <PropertiesList
          properties={properties} />
      </div>
    </>
  )
}