

import "./Address.css"
import { countries } from "../../../context/help";
import * as userActions from "../../../store/session"

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export default function Address(){

    const dispatch = useDispatch()
    const history = useHistory()

    const userState = useSelector(state=>state.session.user)
    
    const [country, setCountry] = useState('Select a country')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [streetAddress, setStreetAddress] = useState('')

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [other, setOther] = useState('')
    const [zipCode, setZipCode] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const [errors, setErrors] = useState()

    const payload = {
        firstName:first,
        lastName:last,
        country,
        state,
        city,
        address:streetAddress,
        zipCode,
        phoneNumber,
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        let error = {}

        if( zipCode && (zipCode.length !== 5 ) ){
            error['zipCode'] = 'Please enter a valid Zip Code'
        }

        if(phoneNumber){
            let num = parseInt(phoneNumber)

            if(isNaN(num)){
                error['phoneNumber'] = 'Phone number must consist entirely of numbers'
            }
        }

        if(!city){
            error['city'] = 'City is required'
        }

        if(city.length < 3){
            error['city'] = 'Please enter the full city name no abbreviations'
        }

        if(!state){
            error['state'] = 'State is required'
        }

        if(state.length < 3){
            error['state'] = 'Please enter the full state name no abbreviations'
        }

        if(country === 'Select a country'){
            error['country'] = 'Country is required'
        }

        if(!streetAddress){
            error['streetAddress'] = 'Street Address is required'
        }

        setErrors(error)

        let ari = Object.keys(error)

        if(ari.length === 0){
            history.push('/order/review')
        }

        console.log(error, 'error')
        console.log(errors, 'errrors')
     
    }


    return(
        <>
            <div className='reviewGrid'>
                <div className="circle"></div>
                <div className="circle1"></div>
                {/* <div className="circle"></div> */}
                <div className="circle"></div>
                <div>Upload</div>
                <div>Address</div>
                {/* <div>Payment</div> */}
                <div>Review</div>
            </div>

            <h1 className="shipping">Enter your Shipping Address</h1>

            <form className='hiThere' onSubmit={handleSubmit}>
                <label>
                    <div className="might"> First Name <div className="red"> * </div></div>
                    <input className="innerF"
                        type='text'
                        value={first}
                        onChange={(e)=>setFirst(e.target.value)}
                    />
                </label>

                <div className="errorss"> {errors?.first ? errors.first : null}</div>


                <label>
                    <div className="might"> Last Name <div className="red"> * </div></div>
                    <input className="innerF"
                        type='text'
                        value={last}
                        onChange={(e)=>setLast(e.target.value)}
                    />
                </label>

                <div className="errorss"> {errors?.last ? errors.last : null}</div>

                <label>
                    <div className="might"> Phone Number <div className="red"> * </div> </div>
                    <input className="innerF"
                        type='text'
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        required
                    />
                </label>

                <div className="errorss"> {errors?.phoneNumber ? errors.phoneNumber : null}</div>

                <label className="toShip">
                    <div className="might">Country <div className="red">*</div></div>
                    <select
                        className="innerB"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map((countryName, index) => (
                        <option key={index} value={countryName}>{countryName}</option>
                        ))}
                    </select>
                </label>

                <div className="errorss"> {errors?.country ? errors.country : null}</div>
                

                <div className="allThree">
                    <label className="toShip">
                        <div className="might">  State <div className="red"> *</div></div>
                        <input className="innerF"
                            type="text"
                            value={state}
                            onChange={(e)=>setState(e.target.value)} 
                            required
                        />

                    </label>

                    <div className="specErrors"> {errors?.state ? errors.state : null}</div>

                    <label className="toShip">
                        <div className="might"> City <div className="red"> *</div></div>
                        <input className="innerF"
                            type="text"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)} 
                            required
                        />
                    </label>

                    
                    <div className="specErrors"> {errors?.city ? errors.city : null}</div>


                    
                    <label>
                        <div className="might"> Zip Code <div className="grey"></div></div>
                        <input className="innerF"
                            type='text'
                            value={zipCode}
                            onChange={(e)=>setZipCode(e.target.value)}
                            required
                        />
                    </label>

                    
                    <div className="specErrors"> {errors?.zipCode ? errors.zipCode : null}</div>

                </div>

                <label className="toShip">
                    <div className="might"> Street Address <div className="red"> *</div></div>
                    <input className="innerF"
                    type="text"
                    value={streetAddress}
                    onChange={(e)=>setStreetAddress(e.target.value)}
                    required
                    />
                </label>

                <div className="errorss"> {errors?.streetAddress ? errors.streetAddress : null}</div>

                <label>
                    <div className="might"> Apt/Suite/Other <div className="grey"> (optional) </div></div>
                    <input className="innerF"
                        type='text'
                        value={other}
                        onChange={(e)=>setOther(e.target.value)}
                    />
                </label>

                <div className="errorss"> {errors?.other ? errors.other : null}</div>

                <button className="reviewButton">Review Order</button>
            </form>   
        </>
    )
}