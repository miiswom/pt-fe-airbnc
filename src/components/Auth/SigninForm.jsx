import { useState } from 'react'
import Header from "../Main/Header"
import { useAuth } from '../../contexts/AuthContext';

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
      .then(async data => {
        if (!data.success) {
          alert("The credentials you've entered are incorrect.")
          console.log(data)
        } else {
          // console.log("data", data)
          await localStorage.setItem('jsonwebtoken', data.token);
          console.log(data.user_id)
          await auth.signin(data.user_id);
          // return data;
        }
      })
      .then(() => {
        history.go(-1)
      })
  }


  return (
    <>
      <title>Sign-in</title>
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

