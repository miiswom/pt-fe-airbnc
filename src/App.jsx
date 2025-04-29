import '../styles/App.css'
import '../styles/reset.css'
import { Routes, Route, useSearchParams } from 'react-router'
import Properties from './components/Properties/Properties'
import { useState } from 'react'
import SingleProperty from './components/Property/SingleProperty'
import PostReviewPage from './components/Property/Reviews/PostReviewPage'
import SignInForm from './components/Auth/SigninForm'
import Signout from './components/Auth/Signout'
import SignupForm from './components/Auth/SignupForm'
import UserProfile from './components/Users/UserProfile'
import Footer from './components/Main/Footer'
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

  // <Header
  //   setSortValue={setSortValue}
  //   sortValue={sortValue}
  //   searchParams={searchParams}
  //   setSearchParams={setSearchParams}
  // // property_type={property_type}
  // // max_price={max_price}
  // />

  return (
    <>
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

        <Route
          path="/signout"
          element={<Signout />}
        />

        <Route
          path='/signup'
          element={<SignupForm />}
        />

        <Route
          path='/users/:id'
          element={<UserProfile />}
        />

        <Route
          path='/unauthorised'
          element={<SignInForm />}
        />
      </Routes>
      <Footer />

    </>


  )
}

// have a component MenuDropout  
// it should have a property of none by default || login/signup/My profile should have a prop of none when it reaches 800
// onClick, the MenuDropout should display a list (select?) of option (login/signup/Myprofile)
// 


export default App
