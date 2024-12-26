
import "./Order.css"

import React, {useEffect, useState, useRef } from "react"

import {useDispatch, useSelector} from "react-redux"

import { useParams, useHistory} from "react-router-dom"

import { useModal } from "../../../context/Modal"

import DeleteOrder from '../DeleteOrder'
import OpenModalButton from "../../OpenModalButton"
import * as partActions from "../../../store/part"
import * as orderActions from "../../../store/order"

import * as help from "../../../context/help"

function GetOrder(){

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


    useEffect(()=>{
        dispatch(partActions.getParts())
        dispatch(orderActions.getOrders())
    },[dispatch])

    const partState = useSelector(state=>state.part)
    const userState = useSelector(state=>state.session)
    const orderState = useSelector(state=>state.order)


    console.log(orderState)

    console.log(partState, 'partState')
    console.log(userState, 'userState') 
    console.log(orderState,'my new order')

    const partElements = Object.values(partState)

    console.log(partElements, 'partElements!!!')


    function deleteOrder(partId){
        return (
            <OpenModalButton
            buttonText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeleteOrder partId={partId}/>}
            />
        )
    }

    function userParts(){
        return partElements.map((element)=>{
            if(element.customerId === userState.user.id){
                console.log('inside the if')

                const date = new Date(element.createdAt)
                const day = date.getDate()
                const month = date.getMonth()+1 
                const year = date.getFullYear()

                console.log(date, 'date')
                console.log(day,'day')
                console.log(month,'month')
                console.log(year, 'year')

                return(
                    <div className="orderWhole">
                            
                        <div className="orderTitle">Custom order placed on: {month}/{day}/{year}</div>
                        
                        <div className="orderInside">
                            <div>Service</div>
                            <div>{element.service}</div>
                        </div>
                    
                        <div className="orderInside">
                            <div>Material</div>
                            <div>{element.material}</div>
                        </div>

                        <div className="orderInside">
                            <div>length (cm) </div>
                            <div>{element.length}</div>
                        </div>

                        <div className="orderInside">
                            <div>Width (cm) </div>
                            <div>{element.width}</div>
                        </div>

                        <div className="orderInside">
                            <div>Height (cm) </div>
                            <div>{element.height}</div>
                        </div>

                        { element.confirmed !== 'yes' ?
                            <div className="orderButtons">
                                {
                                    element.confirmed === 'no' ? 
                                    <button className='ordersFinishButton' onClick={()=>{history.push(`/order/${element.id}/edit`)}}>Finish Order</button> 
                                    :
                                    <button className='ordersEditButton' onClick={()=>{history.push(`/order/${element.id}/edit`)}}>Edit Order</button>
                                }
                                {deleteOrder(element.id)}
                            </div> : null
                        }
                        
                    </div>

                )
            }
        })
    }





    return(
        <>
            <div className="reviewOrder">

                <div className="reviewTitle"> My Orders </div>
               <div className="entire">{userParts()}</div> 

                
            </div>

        </>
    )
}

export default GetOrder
