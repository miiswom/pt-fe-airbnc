import { Link } from 'react-router';
import "../../styles/App.css"

export default function Header() {
  return (
    <>
      <nav className='container row'>
        <h1><Link to="/">AirBNC</Link></h1>
        <select name="" id="">
          <option value="guest">Guest 1</option>
          <option value="host">Host</option>
        </select>
      </nav>
    </>

  )
}