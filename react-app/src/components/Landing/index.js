
import "./Landing.css";
import * as userActions from "../../store/session"

import * as help from "../../context/help"
// import * as images from "../../../public/images"

import OpenModalButton from "../OpenModalButton"
import SignUpFormModal from "../Modals/SignupFormModal"
import Information from "../Modals/Information"
import LoginFormModal from "../Modals/LoginFormModal";

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


    function Quote(){

        if (userState?.user?.id)
        {
            return(
                <OpenModalButton
                buttonText="Instant Quote"
                onItemClick={closeMenu}
                modalComponent={<Information userId={userState?.user?.id}/>}
                />
            )
        }
        else {
            return(
                <OpenModalButton
                    buttonText="Instant Quote"
                    onItemClick={closeMenu}
                    modalComponent={<SignUpFormModal/>}
                />
            )
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        help.subscribe()
    }


    return (
        <>
            <div className="top">

                {/* <div className="videoDiv">
                    <video autoPlay muted loop id='video'>
                        <source src='../../../images/flow.mp4' type="video/mp4"/>
                    </video>
                </div> */}

                <div className="firstBox">

                    <div className="theOut">
                        <div className="firstTitle">Malak Kourani, MBA, BS</div>
                    </div>

                    {/* <div className="secondVid">
                        <video autoPlay muted loop id='videoo'>
                            <source src='../../../images/printed.mp4' type="video/mp4"/>
                        </video>
                    </div> */}

                    {/* <div className="firstPara">
                        Our comprehensive suite of services encompasses cutting-edge 3D printing, 
                        precision laser engraving, and expert CNC cutting. Simplifying the process for our 
                        clients, we've streamlined the pathway to production—simply upload the CAD file of your 
                        desired part, and we'll seamlessly handle the entire fabrication journey. Should you find 
                        yourself without a CAD file, worry not; our solution-driven approach allows you to upload 
                        an image of the part you envision, leaving the intricate details and execution in our 
                        capable hands. With a commitment to precision and innovation, we transform visions 
                        into tangible realities, offering a seamless and accessible experience for all your 
                        manufacturing needs.
                    </div> */}

                    {/* <div className="landingButtonsDiv">
                        {
                            userState?.user ? 
                            <>
                            {Quote()}
                            <button className="eachButton" onClick={()=>{history.push('/order/upload')}}> Custom Part</button>
                            </>

                            :
                            <button  className="customizable" onClick={()=>{history.push('/signup')}}> Need a custom part Sign Up</button>
                        }
                    </div> */}

                </div>
            </div>

            <div className="top">
                <h2 className="gridTitle"> Experience </h2>

                <div className="gridOffers">

                    <div className="item">

                        <div>
                            <img className='gridImages' src='../../../images/machine.jpeg' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Software Engineer</h3>
                    
                        <p>
                            3D
                        </p>

                    </div>

                    <div className="item">

                        <div>
                            <img className='gridImages' src='../../../images/machine.jpeg' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Performance Parts D&R Engineer</h3>

                        <p>
                            3D 
                        </p>

                    </div>

                    <div className="item">
                        <div>
                            <img className='gridImages' src='../../../images/laser.jpeg' alt='image'/>
                        </div>

                        <h3 className="gridTitles">Diagnositc Service Planning Engineer</h3>

                        <div>
                            Laser
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cnc.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Mentor</h3>
                        <div>
                            CNC
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cnc.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Business Intern</h3>
                        <div>
                            CNC
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cnc.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Tax Preparer</h3>
                        <div>
                            CNC
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cnc.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Service Engineering & Operations Intern</h3>
                        <div>
                            CNC
                        </div>
                    </div>

                </div>
            </div>

            <div className="mightGrid">
                
                <div className="supported">

                    <div className="gridTitle">Seamless Support: Just One Click Away</div>
                    
                    <div>
                        For  
                    </div>

                    <button className="eachButton" onClick={()=>{history.push('/contact')}}>Connect with me</button>
                </div>
                

                <form id='contact' method="post" action="https://formspree.io/f/xwkdjggp">
                    
                    <h2 className="gridTitle">Feel Free to Reach Out.</h2>
                    
                    <input className="innerF" name="name" type="text" name="name" placeholder="Name" />
                    
                    <input className='innerF' name="email" type="email" name="email" placeholder="Email" required />
                    
                    <textarea className="innerA" name="message" placeholder="Message" rows="6" required></textarea>
                    
                    <input className='innerB' name='send' type="submit" value="Send Message" />

                </form> 
            </div>
            
            
            <div className="top">
                <h2 className="gridTitle"> Background </h2>

                <div className="gridOffers">

                    <div className="item">
                        <div>
                            <img className='gridImages' src='../../../images/gears.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Mechanical Engineering</h3>
                        <div>
                            Quality 
                        </div>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cube.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Bioengineering</h3>
                        <p>
                            Customization 
                        </p>
                    </div>

                    <div className="item">
                        <div>
                        <img className='gridImages' src='../../../images/cube.jpeg' alt='image'/>
                        </div>
                        <h3 className="gridTitles">Business Administration</h3>
                        <p>
                            Craftsmanship
                        </p>
                    </div>
                </div>
            </div>


            {/* <form className="subscription" onSubmit={handleSubmit}>
            
                <div className="gridTitle">
                    Subscribe to our Newsletter
                </div>

                <input 
                    className='innerF'
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                />

                <button className="subscribeButton">Subscribe</button>
            </form> */}

        </>
    )
}
