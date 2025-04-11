import Menu from "../../../styles/assets/menu.svg"
import LoginOptions from "../Auth/LoginOptions"

export default function MenuDropout({hiddenClass, setHiddenClass}) {
console.log("hh", hiddenClass)
  return (
    <div className="menu-dropout" >
      <img src={Menu} alt="dropout icon" 
      onClick={() => setHiddenClass(!hiddenClass)}
      />
    </div>
  )
}