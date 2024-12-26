import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors({"password":"Confirm Password field must be the same as the Password field"});
    }
  };

  return (
    <>
     
      <form className='sPageForm' onSubmit={handleSubmit}>
        <h1>Create an Account with Xpress Prints</h1>
        <label className="sPageEmail">
          Email
          <input className="sPageInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>

        <div className="errors">{errors?.email ? errors?.email : null}</div>

        <label className="sPageEmail">
          Username
          <input className="sPageInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </label>

        <div className="errors">{errors?.username ? errors?.username : null}</div>

        <label className="sPageEmail">
          Password
          <input className="sPageInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </label>

        <label className="sPageEmail">
          Confirm Password
          <input className="sPageInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </label>

        <div className="errors">{errors?.password ? errors?.password : null}</div>

        <button className='sButton' type="submit">Sign Up</button>

        <div className="rowed">
          <div>Already have an account?</div>
          <NavLink className='sPageLogin' exact to='/login'>login</NavLink>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
