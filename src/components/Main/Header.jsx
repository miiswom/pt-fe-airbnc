import { Link } from 'react-router';
import "../../../styles/App.css"
import Button from '../Button';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const val = useAuth();
  console.log("val.status", val)

  return (
    <>
      <nav className='container row'>
        <h1 style={{ fontSize: "2em", color: "#BD003F", fontWeight: "bold" }}><Link to="/">AirBNC</Link></h1>
        <div className="row" name="" id="" style={{ gap: "30px" }}>

          {val.status ? null : <Button>
            <Link to="/signin" >Log in</Link>
          </Button>}

          {val.status ?
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