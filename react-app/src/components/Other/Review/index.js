
import "./Review.css"

import React, {useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

import * as partActions from "../../../store/part"
import * as orderActions from "../../../store/order"

import * as help from "../../../context/help"

function Review(){

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(partActions.getParts())
    },[dispatch])

    const userState = useSelector(state=>state.session)
    const partState = useSelector(state=>state.part)
  
    const partElements = Object.values(partState)

    let foundPart = partElements.find(part=>part?.confirmed !== 'yes' && part?.customerId === userState?.user?.id )

    const payload = {
        material: foundPart?.material,
        service: foundPart?.service,
        length: foundPart?.length,
        height: foundPart?.height,
        width: foundPart?.width,
        status: 'order placed',
        confirmed: 'yes'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await dispatch(partActions.editPart(payload, foundPart?.id))

        window.alert('Thank you for placing an order with Xpress Prints. Expect a call from us shortly')
        history.push('/')
    }

    return(
        <>
            <form className='reviewOrder' onSubmit={handleSubmit}>
                <div className="reviewTitle"> Order Details </div>

                <div className="insideReview">
                    <div>Service:</div>
                    <div>{foundPart?.service}</div>
                </div>

                <div className="insideReview">
                    <div>Material:</div>
                    <div>{foundPart?.material}</div>
                </div>

                <div className="insideReview">
                    <div>Length:</div>
                    <div>{foundPart?.length}</div>
                </div>

                <div className="insideReview">
                    <div>Width:</div>
                    <div>{foundPart?.width}</div>
                </div>

                <div className="insideReview">
                    <div>Height:</div>
                    <div>{foundPart?.height}</div>
                </div>

                <div className="reva">
                    <button className='orderReview' onClick={()=>{history.push(`/order/${foundPart?.id}/edit`)}}>Go Back & Edit Part</button>
                    <button className="orderReview">Confirm Order</button>
                </div>
            </form>
        </>
    )
}

export default Review













