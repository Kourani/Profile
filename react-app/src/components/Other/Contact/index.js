


import "./Contact.css"


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";


export default function Contact(){

    const dispatch = useDispatch()
    const history = useHistory()

    return(
        <div className="gridContact">
            
            <div className="firstContact">
                <video autoPlay muted loop className="video">
                    <source src='../../../images/ding.mp4' type="video/mp4"/>
                </video>
            </div> 

            <div className="secondContact">
                <h1>Contact Us</h1> 

                <div>Monday - Sunday</div> 
                <div> 7AM - 5PM </div>

                <div>Send us an email</div>
                <div>xpressprnts@gmail.com</div>


            </div>
        </div>
    )
}