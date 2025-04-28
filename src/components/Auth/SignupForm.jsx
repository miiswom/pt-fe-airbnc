import Header from "../Main/Header"
import updateOptions from "../../utils/updateOptions"
import { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';


export default function SignupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("guest")
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const auth = useAuth();

  function handleTargetValue(fn, val) {
    return fn(val)
  }
  
  console.log({
    first_name: firstName,
    surname: surname,
    email: email,
    phone_number: phoneNumber,
    role: role, 
    avatar: avatar,
    password: password
  })
  function handleSignup(e) {
    e.preventDefault()
    console.log("here")
    fetch(`https://pt-be-airbnc.onrender.com/api/signup`, updateOptions({
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        first_name: firstName,
        surname: surname,
        email: email,
        phone_number: phoneNumber,
        role: role, 
        avatar: avatar,
        password: password,
      })
    }))
    .then(res => res.json())
    .then(async data => {
      console.log(data)
      if(data.success) {
        alert(data.msg)
        localStorage.setItem('jsonwebtoken', data.token);
        await auth.signin(data.user_id)
      }
      return data.user_id
    })
    .then((id) => {
      location.assign(`/users/${id}`)
    })
    .catch(err => console.log("err", err))
  }
  
  return (
    <>
        <title>Sign-up</title>
      <Header />

      <section className="container" >
        <h1 style={{ fontWeight: "bold", fontSize: "1.5em", textAlign: "center" }}>Create an AirBNC account:</h1>
        
          <form className="column" style={{ margin: "30px auto" }} onSubmit={(e) => handleSignup(e)}>
          
          <div className="column signup-form" >
            <label htmlFor="first_name" >First name:</label>
            <input type="text" required placeholder="Enter your first name"
              onChange={(e) => handleTargetValue(setFirstName, e.target.value )}
              value={firstName}
            />

            <label htmlFor="surname" >Surname:</label>
            <input  type="text" required placeholder="Enter your surname"
              onChange={(e) => handleTargetValue(setSurname, e.target.value )}
              value={surname} 
            />
            
            <label htmlFor="email" >Email:</label>
            <input type="text" required placeholder="Enter your email"
              onChange={(e) => handleTargetValue(setEmail, e.target.value)}
              value={email} 
            />

            <label  htmlFor="phone_number" >Phone number:</label>
            <input type="text" required placeholder="Enter your phone number"
              onChange={(e) => handleTargetValue(setPhoneNumber, e.target.value)}
              value={phoneNumber} />

            <label htmlFor="role" >Role:</label>
            <select 
              onChange={(e) => handleTargetValue(setRole, e.target.value)}
              value={role} >
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>

            <label htmlFor="avatar" >Avatar link:</label>
            <input type="url" required placeholder="Enter the link of your avatar"
              onChange={(e) => handleTargetValue(setAvatar, e.target.value)}
              value={avatar} />

            <label htmlFor="password" >Password:</label>
            <input type="password" required placeholder="Enter your password"
              onChange={(e) => handleTargetValue(setPassword, e.target.value)}
              value={password} />

            <label htmlFor="password_confirm" >Confirm password:</label>
            <input type="password" required placeholder="Confirm your password"
              onChange={(e) => handleTargetValue(setConfirmPassword, e.target.value)}
              value={confirmPassword} />
              {password === "" || confirmPassword === "" ? null  
              :  password === confirmPassword ? <p style={{color: "green"}}>Password match!</p> : <p style={{color: "red"}}>Password do not match, try again.</p>}
            </div>
            <button type="submit" className={isSubmitted ? 'btn-disabled' : 'btn'}>Create account</button>
          </form>
        
      </section>
    </>

  )
}