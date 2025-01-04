
import React, { useEffect, useState, useRef } from "react"


export function mail(){
    return(
        <i className="fa-solid fa-envelope"></i>
    )
}


export function phone(){
    return(
        <i className="fa-solid fa-phone"></i>
    )
}


export function download(){
    return(
        <i className="fa-solid fa-download"></i>
    )
}


export function linkedin(){
    return(
        <i className="fa-brands fa-linkedin"></i>
    )
}

export function github(){
    return (
        <i className="fa-brands fa-github"></i>
    )
}

export function resume(){
    return(
        <i className="fa-solid fa-file"></i>
    )
}

//all the above export functions are icons


//below function is to create the typing effect on header of the page. 
export const TypingEffect = ({text, speed=100, cursorSpeed=500, pauseDuration=10000}) => {
            
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

//below function is to allow for file download
export const Download = () => {

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


