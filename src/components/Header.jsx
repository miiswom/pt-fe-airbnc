import { Link } from 'react-router';
import "../../styles/App.css"
import Button from './Button';

export default function Header() {
  return (
    <>
      <nav className='container row'>
        <h1 style={{ fontSize: "2em", color: "#BD003F", fontWeight: "bold" }}><Link to="/">AirBNC</Link></h1>
        <div className="row" name="" id="" style={{gap: "30px"}}>
          <Button color={"white"}>
            <Link to="/signin" >Sign in</Link>
          </Button>
          <Button color="white" background="grey">
            <Link to="/signup" >Sign up</Link>
          </Button>
        </div>
      </nav>
    </>

  )
}