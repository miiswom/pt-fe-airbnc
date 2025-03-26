import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import "../../../styles/App.css"
import Button from '../Button';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const val = useAuth();
  // const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(val.currentUser) || "none"
  // console.log(user)

  return (
    <>
      <nav className='container row'>
        <h1 style={{ fontSize: "2em", color: "#BD003F", fontWeight: "bold" }}><Link to="/">AirBNC</Link></h1>
        <div className="row" name="" id="" style={{ gap: "30px" }}>

          {localStorage.jsonwebtoken ? null : <Button>
            <Link to="/signin" >Log in</Link>
          </Button>}

          {user !== "none" ?
            <Button color="#BD003F" background="none" textDecoration="underline">
              <Link to={`/users/${user.user_id}`}>My Profile</Link>
            </Button> : null}
          
          {localStorage.jsonwebtoken ?
            <Button background="grey">
              <Link to="/signout">Log out</Link>
            </Button>

            :
            <Button color="#BD003F" background="none" textDecoration="underline">
              <Link to="/signup" >Sign up</Link>
            </Button>
          }


        </div>
      </nav>
    </>

  )
}