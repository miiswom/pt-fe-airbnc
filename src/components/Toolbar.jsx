import "../../styles/App.css"
import { useEffect, useState } from "react"

export default function Toolbar({ setSearchParams, setProperties}) {
  const [selectVal, setSelectVal] = useState("");
  const [priceRangeVal, setPriceRangeVal] = useState();
  const [minPriceRangeVal, setMinPriceRangeVal] = useState();
  const [maxPriceRangeVal, setMaxPriceRangeVal] = useState();
  const [finalPriceRangeVal, setFinalPriceRangeVal] = useState(0);
// console.log("priceRangeVal", priceRangeVal)
// console.log("finalPriceRangeVal", finalPriceRangeVal)
// console.log("Toolbar properties", properties)


  // function handleSort(e) {
  //   console.log(e.target.value)
  // }

  function handleSelect(e) {
    setSelectVal(e.target.value)
    // setSearchParams({ property_type: e.target.value.toLowerCase() 

    // })
  }

  function handlePriceRangeInput(e) {
    e.preventDefault()
    setPriceRangeVal(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    setSearchParams({property_type: e.target[0].value, max_price: e.target[1].value})
    // handleFilter()
    // setFinalPriceRangeVal(priceRangeVal)
    // setSearchParams({max_price: priceRangeVal})
  }

 

  useEffect(() => {
    fetch(`https://pt-be-airbnc.onrender.com/api/properties`)
      .then(res => res.json())
      .then(data => {
        const properties_prices_per_nigth = []
        for (let property of data.properties) {
          if (!properties_prices_per_nigth.includes(Number(property.price_per_night))) {
            properties_prices_per_nigth.push(Number(property.price_per_night))
          }
        }
        //console.log(properties_prices_per_nigth)

        // setProperties(data.properties)
        setMaxPriceRangeVal(Math.max(...properties_prices_per_nigth))
        setMinPriceRangeVal(Math.min(...properties_prices_per_nigth))

      })
  }, [])


  return (
    <div className="container column" >

      <form className="custom-toolbar row " style={{ margin:" 0 auto"}}
      onSubmit={(e) => handleFormSubmit(e)}>
        <p>Filter by property type &nbsp;</p>
        <select onChange={handleSelect} value={selectVal}>
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

        <p>&nbsp; &nbsp;Price range:&nbsp;</p>
        {/* <p>{minPriceRangeVal}</p> */}
        <div className="row">
          <p style={{ margin: "0 auto" }}>{priceRangeVal}</p>
          <input type="range"
          defaultValue={maxPriceRangeVal}
            min={minPriceRangeVal}
            max={maxPriceRangeVal}
            onChange={(e) => handlePriceRangeInput(e)}
            // onChange={alert(priceRangeVal)}
            // onMouseOut={filterPropertiesByPriceRange}
            // onMouseUp={(e) => handleFinal(e)}
          />
        </div>
        <p>{maxPriceRangeVal}</p>
        <button type="submit">Filter</button>
      </form>
    </div>

  )
}

// onChange treat like an input
// onMouseUp filter the properties
