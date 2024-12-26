
import "./LoginForm.css";

import React, { useState, useRef } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { useModal } from "../../../context/Modal"; 

import Information from "../Information";
import OpenModalButton from "../../OpenModalButton";


function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } 
    
    closeModal()
  };

  const errorMap = Object.values(errors)

  function demoUser(){
    const email = 'demo@aa.io'
    const password = 'password'

    dispatch(login(email, password))
    closeModal(false)
    history.push('/')
    return
  }

  return (
    <>
      <form className='signUpModalForm' onSubmit={handleSubmit}>
        <div className="signUpDiv">
          <h1>Log In</h1>
          
          <label>
            <div>Email</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <div className="errors"> {errors.email ? errors.email : null}</div>

          <label>
            <div>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="errors">{errors.password ? errors.password : null}</div>

          <button type="submit"> Log In</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
