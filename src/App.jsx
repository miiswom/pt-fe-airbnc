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


// create an ExpandableReviews components
// use composition* to 'show reviews' or 'hide reviews'
// inside it, fetch all the reviews for a particular prop

// create a PostReview button
// create a FavouriteProperty button 
// ---> to trigget an event 'OnClick'
// ---> POST, update Database
// --->