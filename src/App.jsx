import '../styles/App.css'
import '../styles/reset.css'
import { Routes, Route, useSearchParams } from 'react-router'
import Header from './components/Header'
import Properties from './components/Properties/Properties'
import { useState } from 'react'
import SingleProperty from './components/SingleProperty/SingleProperty'
import PostReviewPage from './components/SingleProperty/Reviews/PostReviewPage'
import SignInForm from './components/SigninPage'
import UserProvider from './providers/AuthProvider'

function App() {
  const [sortValue, setSortValue] = useState("property_id");
  const [searchParams, setSearchParams] = useSearchParams(
    {
      property_type: "",
      max_price: 400
    })

  const property_type = searchParams.get("property_type")
  const max_price = searchParams.get("max_price");
  // console.log("property_type", {property_type}) 
  // console.log("max_price", {max_price})  

    <Header
      setSortValue={setSortValue}
      sortValue={sortValue}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    // property_type={property_type}
    // max_price={max_price}
    />

  return (
    <Routes>
      <Route
        path='/'
        element={<Properties
          setSortValue={setSortValue}
          sortValue={sortValue}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          property_type={property_type}
          max_price={max_price}

        />} />
      <Route
        path="/properties/:property_id"
        element={<SingleProperty />} />

      <Route
        path="/properties/:property_id/post-review"
        element={<PostReviewPage />} />

      <Route
        path="/signin"
        element={<SignInForm />}
      />
    </Routes>

  )
}

// const property_type = searchParams.get("property_type");
// const max_price = searchParams.get("max_price")

export default App
