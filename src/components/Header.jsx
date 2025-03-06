import { Link } from 'react-router';
import "../../styles/App.css"
import Toolbar from './Toolbar';

export default function Header({setSort, sort, searchParams, setSearchParams, property_type}) {
  // console.log("sort Header", sort)
  return (
    <>
      <nav className='container row'>
        <h1><Link to="/">AirBNC</Link></h1>
        <select name="" id="">
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>
      </nav>
    </>
    
  )
}

// disable the view all property button when all have been displayed