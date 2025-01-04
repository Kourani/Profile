
import "./About.css";
import "../../context/help";
import "../../context/help"
import React, { useEffect, useState, useRef } from "react"
import { download, github, linkedin } from "../../context/help";


export default function About(){

    const TypingEffect = ({text, speed=100, cursorSpeed=500, pauseDuration=10000}) => {
            
            const [display, setDisplay] = useState("")
            const [isTyping, setIsTyping] = useState(true)
            const [cursor, setCursor] = useState(true)
    
            useEffect(() => {
                
                let index = 0
                let typingInterval
                
                const type = () => {
    
                    setIsTyping(true)
                    index = 0
                    setDisplay("")
    
                    const typingInterval = setInterval ( () => {
    
                        if(index < text.length){
                            setDisplay((prev)=> prev + text[index])
                            index ++
                        } else {
    
                            clearInterval(typingInterval)
                            setIsTyping(false)
    
                            setTimeout(()=>{
                                type()
                            }, pauseDuration)
                        }
                    }, speed)
                }
    
                type()
    
                return () => clearInterval(typingInterval)
            }, [text, speed, pauseDuration])
    
    
            useEffect(() => {
                const cursorInterval = setInterval( () => {
                    setCursor((prev)=> !prev)
                }, cursorSpeed)
    
                return () => clearInterval(cursorInterval)
            }, cursorSpeed)
    
            return (
                <div>
                    {display}
                    {cursor && (isTyping || display !== text) && <span>|</span>}
                </div>
            )
    }
    
    const Download = () => {
    
            // event.preventDefault();
    
            const link = document.createElement("a")
            link.href="/INVOICE.pdf"
            link.download = "INVOICE.pdf"
            
            document.body.appendChild(link)
    
            link.click()
    
            document.body.removeChild(link)
    
            return(
                <>
                    {download()} Resume
                </>
            )
    }

    return (
        <>

            <div class="image-container">

                <div class="overlay"></div>

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
