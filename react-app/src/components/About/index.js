
import "./About.css";
import "../Landing/Landing.css"

import React, { useEffect, useState, useRef } from "react"

import { Download, TypingEffect, download, github, linkedin } from "../../context/help";


export default function About(){


    return (
        <>

            <div class="Aimage-container">

                <div class="Aoverlay"></div>

                <h1>
                    <TypingEffect text="Malak Kourani, MBA, BS" speed={100} pauseDuration={1000}/>
                </h1>

                <div className="gridLinks">
                    <a className="linkedDecoration" href="/">Home</a>
                    <a className="linkedDecoration" href="https://www.linkedin.com/in/malakkourani/"> {linkedin()} LinkedIn</a>
                    <a className="linkedDecoration" href="https://github.com/Kourani"> {github()} GitHub</a>
                    <a className="linkedDecoration" href="/about"> About Me</a>

                    <button onClick={Download} className="linkedDecoration">
                        {download()} Resume
                    </button>

                    {/* <a className="linkedDecoration" href="/more">More</a> */}
                </div>
                
            </div>



            <div className="top">
                <h2 className="gridTitle"> About Me </h2>

                <p>
                    With a unique academic background and a blend of both business and engineering,
                    Malak brings a rare combination of technical expertise and business insight.
                    Her hands on experience as both an engineer and a business intern has nned her
                    ability to tackle complex challenges while driving inovatve solutions.
                    Ready to make an impact, Malak is a dynamic professional eager to contribute to
                    high performace teams and deliver results at the intersection of engineering
                    and business.
                </p>
            </div>
        </>
    )
}
