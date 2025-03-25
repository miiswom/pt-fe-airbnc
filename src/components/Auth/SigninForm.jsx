import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import Header from "../Main/Header"
import setAuthenticationHeader from '../../utils/authenticate';
import { useAuth } from '../../contexts/AuthContext';
import updateOptions from '../../utils/updateOptions';

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false)
  const auth = useAuth();

  function handlePasswordVal(e) {
    setPassword((curr) => {
      curr = e.target.value;
      return curr
    })
  }
  function handleEmailVal(e) {
    setEmail((curr) => {
      curr = e.target.value;
      return curr
    })
  }

  function handleSignin(e) {
    e.preventDefault()
    setIsSubmitted(true)

    fetch(`https://pt-be-airbnc.onrender.com/api/signin`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(
          {
            email: email,
            password: password
          }
        )
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log("here")
        if (!data.success) {
          console.log(data)
        } else {
          console.log("data", data)
          localStorage.setItem('jsonwebtoken', data.token);
          // fetch(`https://pt-be-airbnc.onrender.com/api/users/${data.user_id}`, updateOptions())
          // .then(res => res.json())
          // .then(data => {
          //   console.log("data II", data)
          //     // setCurrentUser(data);
          //     // setCurrentUser(localStorage.currentUser)
          //     // setStatus(true)
          // })
          // .catch(err => console.log(err))          // Cookies.set("access_token", data.token, {expires: 7, secure: true})
          auth.signin(data.user_id);
        }
      })
      .then(() => {
          history.back()
      })
  }


  return (
    <>
      <Header />

      <div className="container column">
        <form className="column" style={{ margin: "30px auto" }} action="" onSubmit={(e) => handleSignin(e)}>
          <label
            style={{
              marginBottom: "10px"
            }}
            htmlFor="email"
          >Email:</label>

          <input
            style=
            {{
              marginBottom: "10px",
              border: "1px solid grey",
              padding: "10px"
            }}
            type="text"
            required
            placeholder="Enter your email"
            onChange={(e) => handleEmailVal(e)}
            value={email}
          />

          <label
            style={{
              marginBottom: "10px"
            }}
            htmlFor="password"
          >Password:</label>

          <input
            style={{
              marginBottom: "10px",
              border: "1px solid grey",
              padding: "10px"
            }}
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => handlePasswordVal(e)}
            value={password} />
          <button type="submit" className={isSubmitted ? 'btn-disabled' : 'btn'}>Signin</button>
        </form>
      </div>
    </>

  )
}

// {
//   "email" : "alice@example.com",
//   "password": "111111111111"
// }

// {
//   "email" : "invalid@example.com",
//   "password": "invalid"
// }

