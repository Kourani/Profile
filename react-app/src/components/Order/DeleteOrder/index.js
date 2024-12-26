
import './DeleteOrder.css'
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"

import * as partActions from "../../../store/part"
import { useModal } from "../../../context/Modal"

export default function DeleteComment(partId){

    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const [clicked, setClicked] = useState('False')


    function toDelete(){
        dispatch(partActions.deletePart(partId.partId))
        setClicked('True')
        closeModal()
        return
    }

    return (
        <div className="deleteOrderModal">
            <h1>Are you sure you want to delete this order?</h1>
            <div className="finish">
                <button onClick={toDelete}> YES, DELETE </button>
                <button onClick={()=>{closeModal()}}>No, Keep </button>
            </div>
        </div>
    )

}
