import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      
      <form onSubmit={handleSubmit} className="lPageForm">
        <h1>Log In to Xpress Prints</h1>
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

        <div className="errors"> {errors.email ? errors.email : null}</div>

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

        <div className="errors">{errors.password ? errors.password : null}</div>
        
        <button className='lButton' type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
