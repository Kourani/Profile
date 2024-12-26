import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DemoLogin() {
  const dispatch = useDispatch();
  const email = 'demo@aa.io'
  const password = 'password'
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
        closeModal()
  };

  return (
    <>


      <form onSubmit={handleSubmit}>
        <div className="modalsInside">
        <h1>Log in as a Demo User</h1>
        <label>
          Email
          <input
            type="text"
            value={email}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            required
          />
        </label>
        <button className='uniButton' type="submit">Log In Demo</button>
        </div>
      </form>
    </>
  );
}

export default DemoLogin;
