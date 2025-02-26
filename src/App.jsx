import '../styles/App.css'
import '../styles/reset.css'
import { Routes, Route, useSearchParams} from 'react-router'
import Header from './components/Header'
import Properties from './components/Properties'
import { useState } from 'react'

function App() {
  const [sort, setSort] = useState("property_id")
  const [propTypeFilter, setPropTypeFilter] = useState("") 
  const [searchParams, setSearchParams] = useSearchParams()
  console.log("App sort", sort)
  console.log("App propTypeFilter", propTypeFilter)
  console.log("App searchParams", searchParams)

  return (
    <Routes>
      <Route
        path='/'
        element={<Header
          setSort={setSort}
          sort={sort}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          
          setPropTypeFilter={setPropTypeFilter}
          propTypefilter={propTypeFilter} />} />

      <Route
        path='/properties'
        element={<Properties
          setSort={setSort}
          sort={sort}
          searchParams={searchParams}
          setSearchParams={setSearchParams}

          setPropTypeFilter={setPropTypeFilter}
          propTypeFilter={propTypeFilter} />} />
    </Routes>
  )
}

export default App
