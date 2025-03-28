import { useState, useEffect } from "react"
import "../../../styles/App.css";
import Header from "../Main/Header";
import PropertiesList from "./PropertiesList";
import Toolbar from "../Main/Toolbar";

export default function Properties({ setSortValue, sortValue, searchParams, setSearchParams, property_type, max_price, maxPriceRangeVal, setMaxPriceRangeVal }) {
  const [properties, setProperties] = useState([])
  // console.log("property_type II", property_type)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties?sort=${sortValue}`)
      .then((res) => res.json())
      .then((data) => {
        const ids = []
        const props = []
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

        if (property_type === "" || property_type === undefined || property_type === null) {
          if (Number(max_price) < 400) {
            const filteredPropssss = props.filter((prop) => Number(prop.price_per_night) <= Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(props)
          }
        } else if (property_type.length > 0) {
          const filteredProps = props.filter((prop) => prop.property_type === property_type)
          if (Number(max_price) < 400) {
            const filteredPropssss = filteredProps.filter((prop) => Number(prop.price_per_night) < Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(filteredProps)
          }
        } else {
          setProperties(props)
        }

        // using the max_price params to filter
        setIsLoading(false)
      })
  }, [property_type, max_price])

  if (isLoading) return (
    <>
    <title>AirBNC</title>
      <Header />
      <div className="container">
        <h1>Loading properties...</h1>
      </div>

    </>)

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