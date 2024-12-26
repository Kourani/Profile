
import "./Upload.css"

import React, {useEffect, useState } from "react"

import {useDispatch, useSelector} from "react-redux"

import { useParams, useHistory} from "react-router-dom"

import * as partActions from "../../../store/part"

function CreateUpload(){

    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(()=>{
        dispatch(partActions.getParts())
    },[dispatch])

    const partState = useSelector(state=>state.part)

    const [material, setMaterial] = useState()
    const [service, setService] = useState()

    const [length, setLength] = useState()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

    const [image, setImage] = useState("")
    const [imageFile, setImageFile] = useState()
    const [CADFile, setCADFile] = useState()

    const [file, setFile] = useState('yes')
    const [status, setStatus] = useState('order placed')
    const [confirmed, setConfirmed] = useState('no')

    const [errors, setErrors] = useState({})


    const payload = {
        material,
        service,

        length,
        width,
        height,

        image,
        imageFile,
        CADFile,

        file,
        status, 
        confirmed,
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await dispatch(partActions.newPart(payload))

        console.log(data,'data today')
        if(data && data?.errors){
            setErrors(data?.errors)
        }
        else{
            history.push(`/order/address`)
        }

        console.log(errors, 'show me them')
    }

    return(
        <>
        <form className="createProductForm" onSubmit={handleSubmit}>

            <div className="entireGrid">
                <div className="circle1"></div>
                <div className="circle"></div>
                {/* <div className="circle"></div> */}
                <div className="circle"></div>
                <div>Upload</div>
                <div>Address</div>
                {/* <div>Payment</div> */}
                <div>Review</div>
            </div>

            <h1 className="createProductTitle"> Upload File </h1>

            <div className="uploadType">
                
                {/* Service */}
                <label className="labelName" >
                    <div>Please select the service</div>
                    <select
                    onChange={(e)=>setService(e.target.value)}
                    value={service}
                    placeholder="Choose a Service">
                        <option>Select service </option>
                        <option value='3D Printing'>3D Printing</option>
                        <option value='CNC Machining'>CNC Machining</option>
                        <option value='Laser Engraving'>Laser Engraving</option>
                    </select>
                </label>

                <div className="errors"> {errors.service ? errors.service : null}</div>


                {/* material  */}
                <label className="labelName" >
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


                <div> Only one of the following is required (your choice)</div>
                <div className="tooInside">
                
                    {/* image link */}
                    <label className="labelName" >
                        <div>Image link </div>
                        <input
                            type='text'
                            value={image}
                            placeholder="Enter Part Image"
                            onChange={(e)=>setImage(e.target.value)}
                            // required
                            />
                    </label>

                    <div className="errors"> {errors.image ? errors.image : null}</div>

                    {/* image file  */}
                    <label className="labelName">
                    <div> Image file </div>
                        <input
                            type='file'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    // Use FileReader to read file contents
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                    // Access the image URL here
                                    const imageUrl = event.target.result;
                                    // Use the image URL or perform operations on the image
                                    // For instance, set it to state to display it
                                    setImageFile(imageUrl);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            // accept attribute restricts file types allowed
                            accept="image/*"
                            // required
                        />
                    </label>

                    <div className="errors"> {errors.imageFile ? errors.imageFile : null}</div>


                    {/* cad file  */}
                    <label className="labelName">
                        <div>Please upload the CAD file</div>
                        <input
                            type='file'
                            onChange={(e) => {
                            const file = e.target.files[0];
                                if (file) {
                                    // Check the file extension to verify it's a CAD file
                                    const allowedExtensions = [".dwg", ".dxf", ".step", ".iges"];
                                    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                                    
                                    if (allowedExtensions.includes(extension)) {
                                    // Use FileReader to read file contents
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        // Access the CAD file URL here
                                        const cadFileUrl = event.target.result;
                                        // Use the CAD file URL or perform operations on the file
                                        // For instance, set it to state to use it in the application
                                        setCADFile(cadFileUrl);
                                    };
                                    reader.readAsDataURL(file);
                                    } else {
                                    // Handle invalid file extension error here
                                    alert('Please select a valid CAD file format.');
                                    // Optionally, reset the input value to clear the selection
                                    e.target.value = null;
                                    }
                                }
                            }}
                            // accept attribute restricts file types allowed
                            accept=".dwg, .dxf, .step, .iges"
                            // required
                        />
                    </label>

                    <div className="errors"> {errors.CADFile ? errors.CADFile : null}</div>
                </div>

                {/* length */}
                <label className="labelName">
                    <div> Length (cm) </div>
                    <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Enter Part Length"
                    required
                    />
                </label>

                <div className="errors"> {errors.length ? errors.length : null}</div>

                {/* width  */}
                <label className="labelName">
                    <div>Width (cm) </div>
                    <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Enter Part Width"
                    required
                    />
                </label>

                <div className="errors"> {errors.width ? errors.width : null}</div>

                {/* height */}
                <label className="labelName">
                    <div>Height (cm) </div>
                    <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter Part Height"
                    required
                    />
                </label>

                <div className="errors"> {errors.height ? errors.height : null}</div>

            </div>

            <button className='uploadButton' type='submit'>Submit</button>
        </form>
        </>
    )
}

export default CreateUpload



