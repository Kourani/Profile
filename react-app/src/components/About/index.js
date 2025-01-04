
import "./About.css";

import React, { useEffect, useState, useRef } from "react"

import { Download, TypingEffect, download, github, linkedin } from "../../context/help";


export default function About(){


    return (
        <>

            <div class="about-image-container">

                <div class="about-overlay"></div>

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
                    ..................
                </p>
            </div>
        </>
    )
}
