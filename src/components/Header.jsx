import { Link } from 'react-router';
import "../../styles/App.css"
import Toolbar from './Toolbar';

export default function Header({setSort, sort, searchParams, setSearchParams, setPropTypeFilter, propTypefilter}) {
  console.log("sort Header", sort)
  return (
    <>
      <nav className='container row'>
        <h1><Link to="/">AirNC</Link></h1>
        <select name="" id="">
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>
      </nav>
      <Toolbar 
      setSort={setSort} 
      sort={sort} 
      searchParams={searchParams}
      setSearchParams={setSearchParams}

      setPropTypeFilter={setPropTypeFilter} 
      propTypefilter={propTypefilter}/>
      <div className='container'>
        <button style={{margin: "0 auto"}}><Link to="/properties">View All Properties</Link></button>
    </div >
    </>
    
  )
}

// disable the view all property button when all have been displayed