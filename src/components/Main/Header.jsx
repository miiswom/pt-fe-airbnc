import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import "../../../styles/App.css"
import Button from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import MenuDropout from './MenuDropout';
import LoginOptions from "../Auth/LoginOptions"
export default function Header() {
  const [hiddenClass, setHiddenClass] = useState(true)

  return (
    <>
      <nav className='container row'>
        <h1 style={{ fontSize: "2em", color: "#BD003F", fontWeight: "bold" }}><Link to="/">AirBNC</Link></h1>
        <div>
        <MenuDropout hiddenClass={hiddenClass} setHiddenClass={setHiddenClass}/>
        <LoginOptions hiddenClass={hiddenClass} setHiddenClass={setHiddenClass}/>
        </div>
      </nav>
    </>

  )
}