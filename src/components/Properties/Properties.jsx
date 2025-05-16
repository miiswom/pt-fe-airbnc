import { useState, useEffect } from "react"
import "../../../styles/App.css";
import Header from "../Main/Header";
import PropertiesList from "./PropertiesList";
import Toolbar from "../Main/Toolbar";
import { fetchAllProperties } from "../../utils/fetch";
import SkeletonGrid from "./SkeletonList";

export default function Properties({ setSortValue, sortValue, searchParams, setSearchParams, property_type, max_price, maxPriceRangeVal, setMaxPriceRangeVal }) {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAllProperties(sortValue)
      .then((data) => {
        data.properties.sort((a, b) => {
          return a[sortValue] < b[sortValue] ? 1 : 1
        })

        if (property_type === "" || property_type === undefined || property_type === null) {
          if (Number(max_price) < 400) {
            const filteredPropssss = data.properties.filter((prop) => Number(prop.price_per_night) <= Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(data.properties)
          }
        } else if (property_type.length > 0) {
          const filteredProps = data.properties.filter((prop) => prop.property_type === property_type)
          if (Number(max_price) < 400) {
            const filteredPropssss = filteredProps.filter((prop) => Number(prop.price_per_night) < Number(max_price))
            setProperties(filteredPropssss)
          } else {
            setProperties(filteredProps)
          }
        } else {
          setProperties(data.properties)
        }
        setIsLoading(false)
      })
  }, [property_type, max_price])

  if (isLoading) return (<>
      <title>AirBNC</title>
      <Header />
      <Toolbar />
      <div className="container">
        {/* <h1>Thank you for you patience, properties are loading...</h1> */}
        <SkeletonGrid />
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