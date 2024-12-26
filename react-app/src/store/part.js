

//------------------------------------CONSTANTS--------------------------
const GET_ALL = "parts/GET_ALL";
const ADD_PART = "parts/ADD_PART";
const EDIT_PART = "parts/EDIT_PART";
const DELETE_PART = "parts/DELETE_PART";
//-----------------------------------ACTIONS---------------------------------------
const getAll = (all) => ({
    type:GET_ALL,
    payload:all
})

const addOne =(part) =>({
    type: ADD_PART,
	payload:part
})

const editOne = (part) =>({
	type: EDIT_PART,
	payload:part
})

const deleteOne = (part) => ({
	type: DELETE_PART,
	part
});


//-----------------------------------------THUNKS------------------------------------


export const newPart = (payload) => async(dispatch) => {
	const response = await fetch(`/api/parts/`, {
		method:'POST',
		headers:{
			"Content-Type" : "application/json",
		},
		body:JSON.stringify(payload)
	})


	if(response.ok){
		const uploadedPart = await response.json()
		dispatch(addOne(uploadedPart))
	}
	else{
		const key = await response.json()
		return key
	}
}


export const getParts = () => async (dispatch) => {

	const response = await fetch("/api/parts/")

	if (response.ok) {
		const allParts = await response.json()
		dispatch(getAll(allParts));
	}
	else {
		return await response.json()
	}
};

export const editPart = (payload, partId) => async(dispatch) => {
	const response = await fetch(`/api/parts/${partId}/edit`, {
		method:'PUT',
		headers:{
			"Content-Type" : "application/json",
		},
		body:JSON.stringify(payload)
	})

	if(response.ok){
		const updatedPart = await response.json()
		dispatch(editOne(updatedPart))
	}
	else{
		return await response.json()
	}
}

export const deletePart = (partId) => async (dispatch) => {
	const response = await fetch(`/api/parts/${partId}`, {
		method:'DELETE',
		headers:{
			'Content-Type': "application/json"
		}
	})

	if(response.ok){
		dispatch(deleteOne(partId))
	}

	else{
		return await response.json
	}
}

//-------------------------------------------REDUCER------------------------------------------
function partsReducer(state = {}, action) {
	switch (action.type) {
		case GET_ALL:
			let newState = {...state}
			action.payload.parts.forEach(element=>{
				newState[element.id]=element
			})
			return newState

        case ADD_PART:
            let addition = {...state}
			addition[action.payload.id]=action.payload
			return addition

		case EDIT_PART:
			let edited = {...state}
			edited[action.payload.id]=action.payload
			return edited

		case DELETE_PART:
			let newSt={...state}
			delete newSt[action.part]
			return {
				...newSt
			}

		default:
			return state;
	}
}

export default partsReducer
