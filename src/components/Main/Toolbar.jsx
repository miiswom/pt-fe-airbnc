import "../../../styles/App.css"
import { useEffect, useState } from "react"
import { fetchAllPrices } from "../../utils/fetch";

export default function Toolbar({ setSearchParams }) {
  const [selectVal, setSelectVal] = useState("");
  const [priceRangeVal, setPriceRangeVal] = useState();
  const [minPriceRangeVal, setMinPriceRangeVal] = useState();
  const [maxPriceRangeVal, setMaxPriceRangeVal] = useState();

  function handleSelectValue(e) {
    setSelectVal(e.target.value)
  }

  function handlePriceRangeInput(e) {
    e.preventDefault()
    setPriceRangeVal(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    setSearchParams({ property_type: e.target[0].value, max_price: e.target[1].value })
  }

  useEffect(() => {
    fetchAllPrices()
      .then((prices) => {
        setMaxPriceRangeVal(Math.max(...prices))
        setMinPriceRangeVal(Math.min(...prices))
      })
  }, [])


  return (
    <>
      <title>Homepage</title>
      <div className="container" >

        <form className="toolbar column" style={{ margin: " 0 auto" }}
          onSubmit={(e) => handleFormSubmit(e)}>
          <div className="row">
            <p>Filter by property type &nbsp;</p>
            <select onChange={handleSelectValue} value={selectVal}>
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

          <div className="row">
            <p>&nbsp;Price range:&nbsp;</p>
            <p style={{ margin: "0 auto" }}>{priceRangeVal}</p>
            <input type="range"
              className="accent"
              defaultValue={maxPriceRangeVal}
              min={minPriceRangeVal}
              max={maxPriceRangeVal}
              onChange={(e) => handlePriceRangeInput(e)}
            />
            <p>{maxPriceRangeVal}</p>

          </div>

          <button className="btn" type="submit">Filter</button>
        </form>
      </div>
    </>


  )
}
