import "../../styles/App.css"
import {Link} from 'react-router'
import { useState, useRef } from "react"

export default function Toolbar({setSort, sort, searchParams,setSearchParams, setPropTypeFilter, propTypeFilter}) {
  console.log("Toolbar sort", sort)
  const [selectVal, setSelectVal] = useState("...")
  function handleSort(e) {
    // console.log("e.target.value", e.target.value)
    setSort(e.target.value)
  }

  function handleFilter(e) {
    console.log("e.target.value", e.target.value)
    setSelectVal(e.target.value)
    setSearchParams({property_type: e.target.value.toLowerCase()})
  }
  
  return (
    <div className="container row">
      <div className="custom-toolbar row">
        <p>Filter by property type &nbsp;</p>
        <select value={selectVal} onChange={handleFilter}>
          <option value="" defaultValue=""></option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Studio">Studio</option>
          <option value="Loft">Loft</option>
          <option value="Villa">Villa</option>
          <option value="Cottage">Cottage</option>
          <option value="Chalet">Chalet</option>
          <option value="Cabin">Cabin</option>
          <option value="Mansion">Mansion</option>
          <option value="Castle">Castle</option>
        </select>
      </div>
      
      <div className="custom-toolbar row">
        <p>Sort by: &nbsp;</p>
        <select value={sort} onChange={handleSort}>
          <option value="property_id">Property Id</option>
          <option value="price_per_night">Price per night (ascending)</option>
          <option value="price_per_night">Price per night (descending)</option>
          <option value=""></option>
        </select>
      </div>
    </div>

  )
}