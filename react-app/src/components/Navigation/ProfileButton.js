
import React, { useState, useEffect, useRef } from "react";
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";

import OpenModalButton from "../OpenModalButton";

import {useModal} from "../../context/Modal"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const {closeModal} = useModal()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {

    history.push('/')
    closeMenu()
  };

  
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
     
      <div className='theBarSize' onClick={openMenu}>
          <i className="fa-regular fa-circle-user fa-2x" />
      </div>
 
      <h1 className="simpleTitle"> Malak </h1>
   
    </>
  );
}

export default ProfileButton;
