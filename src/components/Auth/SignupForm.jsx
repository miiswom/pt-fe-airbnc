import Header from "../Main/Header"
import { useState } from "react"

export default function SignupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  //const newUser = [first_name, surname, email, phone_number, role, avatar, password];

  function handleSignup() { }
  return (
    <>
      <Header />

      <section className="container" >
        <h1 style={{ fontWeight: "bold", fontSize: "1.5em", textAlign: "center" }}>Create an AirBNC account:</h1>
        
          <form className="column" style={{ margin: "30px auto" }} action="" onSubmit={(e) => handleSignup(e)}>
          <div className="signup-form">
            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="first_name"
            >First name:</label>
            <input
              style=
              {{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="text"
              required
              placeholder="Enter your first name"
              onChange={""}
              value={""}
            />
            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="surname"
            >Surname:</label>
            <input
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="text"
              required
              placeholder="Enter your surname"
              onChange={""}
              value={""} />
            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="email"
            >Email:</label>
            <input
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="text"
              required
              placeholder="Enter your email"
              onChange={""}
              value={""} />

            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="phone_number"
            >Phone number:</label>
            <input
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="text"
              required
              placeholder="Enter your phone number"
              onChange={""}
              value={""} />

            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="role"
            >Role:</label>
            <select
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              onChange={""}
              value={""} >
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>

            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="avatar"
            >Avatar link:</label>
            <input
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="url"
              required
              placeholder="Enter the link of your avatar"
              onChange={""}
              value={""} />

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
              type="text"
              required
              placeholder="Enter your password"
              onChange={""}
              value={""} />

            <label
              style={{
                marginBottom: "10px"
              }}
              htmlFor="password_confirm"
            >Confirm password:</label>
            <input
              style={{
                marginBottom: "10px",
                border: "1px solid grey",
                padding: "10px"
              }}
              type="text"
              required
              placeholder="Confirm your password"
              onChange={""}
              value={""} />
            </div>
            <button type="submit" className={isSubmitted ? 'btn-disabled' : 'btn'}>Create account</button>
          </form>
        
      </section>
    </>

  )
}