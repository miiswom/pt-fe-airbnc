import '../styles/App.css'
import '../styles/reset.css'
import { Routes, Route, useSearchParams} from 'react-router'
import Header from './components/Header'
import Properties from './components/Properties'
import { useState } from 'react'
import SingleProperty from './components/SingleProperty'

function App() {
  const [sort, setSort] = useState("property_id")
  const [searchParams, setSearchParams] = useSearchParams({property_type: ""})
  const property_type = searchParams.get("property_type")
  // console.log("App sort", sort)
  // console.log("App propTypeFilter", propTypeFilter)
  // console.log("App searchParams", searchParams.get('property_type'))
  {<Header
    setSort={setSort}
    sort={sort}
    searchParams={searchParams}
    setSearchParams={setSearchParams}
    property_type={property_type}
    />}
  return (
    <Routes>
      {/* <Route
        path='/'
        element= /> */}

      <Route
        path='/'
        element={<Properties
          setSort={setSort}
          sort={sort}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          property_type={property_type}
          />} />

      <Route 
      path="/properties/:property_id"
      element={<SingleProperty/>}/>
    </Routes>
  )
}

export default App
