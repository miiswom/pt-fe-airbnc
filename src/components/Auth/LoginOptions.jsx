import { Link } from "react-router"
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";

export default function LoginOptions({ hiddenClass, setHiddenClass }) {
  const authVal = useAuth();
  const loggedUser = JSON.parse(authVal.currentUser) || "none"
  console.log("sdksdsk", hiddenClass)

  return (
    <div className={`row auth-options ${hiddenClass ? "hidden" : null}`} name="" id="" style={{ gap: "30px", margin: "0 auto" }}>

      {localStorage.jsonwebtoken ? null : <Button>
        <Link to="/signin" >Log in</Link>
      </Button>}

      {loggedUser !== "none" ?
        <Button color="#BD003F" background="none" textDecoration="underline">
          <Link to={`/users/${loggedUser.user_id}`}>My Profile</Link>
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
  )
}