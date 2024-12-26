

import "./Information.css";

import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";


import { useModal } from "../../../context/Modal"; 
import OpenModalButton from "../../OpenModalButton";

import * as partActions from "../../../store/part"
import * as help from "../../../context/help"


function Information() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();


  const [service, setService] = useState();
  const [material, setMaterial] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [file, setFile] = useState()
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };





  const payload = {
    material,
    service,
    length,
    width,
    height,
    file,
}


const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await dispatch(partActions.newPart(payload))

    console.log(data,'data today')
    if(data && data?.errors){
        setErrors(data?.errors)
    }
    else {
      let volume = length * width * height //this has to be provided in cm 
      let mass = volume* help.densities[material]
      let price = mass * .13 // 1 gram sells for 13 cents --- this is purley price for material 
      let totalPrice = price + 6 //6 for any shipping costs 
      
      let userInput = window.confirm(`Cost $${price.toFixed(2)} Please keep in mind this is an estimation and does not include the complexity of the part if the CAD file is not provided`)
      if(userInput){
        window.location.href = `/orders`
      }
        closeModal()
    }
  }

  return (
    <>
      <form className='infoForm' onSubmit={handleSubmit}>

        <h1> Get a Quote </h1>

        <div className='infoWhole'>

          {/* Service */}
          <label className="infolabelName">
              <div>Please select the service</div>
              <select
              onChange={(e)=>setService(e.target.value)}
              value={service}
              placeholder="Choose a Service">
                  <option> Select service </option>
                  <option value='3D Printing'>3D Printing</option>
                  <option value='CNC Machining'>CNC Machining</option>
                  <option value='Laser Engraving'>Laser Engraving</option>
              </select>
          </label>

          <div className="errors"> {errors.service ? errors.service : null}</div>

          {/* material  */}
          <label className="infolabelName" >
              <div>Please select the material</div>
              <select
              onChange={(e)=>setMaterial(e.target.value)}
              value={material}
              placeholder="Choose a Material">
                  <option>Select material </option>
                  <option value='PLA'>PLA</option>
                  <option value='PETG'>PETG</option>
                  <option value='TPU'>TPU</option>
                  <option value='PVA'>PVA</option>
                  <option value='Wood'>Wood</option>
                  <option value='ABS'>ABS</option>
                  <option value='Black Nylon'>Black Nylon</option>
                  <option value='Glow in the dark green PLA'>Glow in the dark green PLA</option>
              </select>
          </label>

          <div className="errors"> {errors.material ? errors.material : null}</div>

          {/* length */}
          <label className="infolabelName">
            <div>Length (cm) </div>
            <input
              type="text"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Part Length"
              required
            />
          </label>

          <div className="errors"> {errors.length ? errors.length : null}</div>
          
          {/* width  */}
          <label className="infolabelName">
            <div>Width (cm) </div>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Part Width"
              required
            />
          </label>

          <div className="errors"> {errors.width ? errors.width : null}</div>

          {/* height */}
          <label className="infolabelName">
            <div>Height (cm) </div>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Part Height"
              required
            />
          </label>

          <div className="errors"> {errors.height ? errors.height : null}</div>

          {/* File */}
          <label className="infolabelName">
            <div>Do you have a cad file?</div>
            <select
            onChange={(e)=>setFile(e.target.value)}
            value={file}
            placeholder="Choose a Service">
                <option>Choose yes or no </option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </select>
          </label>

          <div className="errors"> {errors.file ? errors.file : null}</div>

        </div>

        <button className='infoButton' type='submit'> Submit </button>
      </form>
    </>
  );

}

export default Information;
