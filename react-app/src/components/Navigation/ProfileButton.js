import React, { useState, useEffect, useRef } from "react";
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import DemoLogin from "../DemoLogin"

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
    e.preventDefault();
    dispatch(logout());

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

      
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>

              <div className="userInformation">
                <div>Welcome back {user.firstName}</div>
                <div>{user.email}</div>
              </div>

              <div className="userButtons">
                <button className="userNavButton" onClick={()=>{history.push('/orders'); closeMenu()}}>View Orders</button>
                <button className="userNavButton" onClick={handleLogout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
            <div className="notLoggedIn">
              {/* <div onClick={()=>{closeMenu()}}>
              <OpenModalButton
                buttonText="Log In Demo"
                onItemClick={closeModal}
                modalComponent={<DemoLogin/>}
              />
              </div> */}

              <h1 className="simpleTitle"> Xpress Prints </h1>
              <div onClick={()=>{closeMenu()}}>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>

              <div onClick={()=>{closeMenu()}}>
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={()=>{closeMenu()}}
                modalComponent={<SignupFormModal />}
              />
              </div>
              </div>

            </>
          )}
        </div>
   
    </>
  );
}

export default ProfileButton;
