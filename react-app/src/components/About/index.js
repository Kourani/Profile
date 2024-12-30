
import "./About.css";


import * as help from "../../context/help"

import { useModal } from "../../context/Modal";


import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'


export default function Landing(){

    const dispatch = useDispatch()
    const history = useHistory()
    const ulRef = useRef();

    const { closeModal } = useModal();
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
    };


    const userState = useSelector(state=>state.session)

    console.log(userState, 'userState')


    const handleSubmit = async (e) => {
        e.preventDefault()

        help.subscribe()
    }


    return (
        <>

            <div class="image-container">

                <div class="overlay"></div>

                <h1>Malak Kourani, MBA, BS</h1>

                <div className="gridLinks">
                    <a className="linkedDecoration" href="/">Home</a>
                    <a className="linkedDecoration" href="https://www.linkedin.com/in/malakkourani/">LinkedIn</a>
                    <a className="linkedDecoration" href="/about">About Me</a>
                    <a className="linkedDecoration" href="/more">More</a>
                </div>

            </div>



            <div className="top">
                <h2 className="gridTitle"> About Me </h2>

                <p>
                    ..................
                </p>
            </div>
        </>
    )
}
