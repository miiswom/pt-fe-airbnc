import '../styles/App.css'
import '../styles/reset.css'
import { Routes, Route, useSearchParams} from 'react-router'
import Header from './components/Header'
import Properties from './components/Properties'
import { useState } from 'react'
import SingleProperty from './components/SingleProperty'

function App() {
  const [sort, setSort] = useState("property_id");
  const [searchParams, setSearchParams] = useSearchParams(
    {
      property_type: "", 
      max_price: 400
    })

  const property_type = searchParams.get("property_type")
  const max_price = searchParams.get("max_price");
  console.log("property_type", {property_type}) 
  console.log("max_price", {max_price})  
 
  
  {<Header
    setSort={setSort}
    sort={sort}
    searchParams={searchParams}
    setSearchParams={setSearchParams}
    // property_type={property_type}
    // max_price={max_price}
    />}
    
  return (
    <Routes>
      <Route
        path='/'
        element={<Properties
          setSort={setSort}
          sort={sort}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          property_type={property_type}
          max_price={max_price}

          />} />

      <Route 
      path="/properties/:property_id"
      element={<SingleProperty/>}/>
    </Routes>
  )
}

// const property_type = searchParams.get("property_type");
// const max_price = searchParams.get("max_price")

export default App
