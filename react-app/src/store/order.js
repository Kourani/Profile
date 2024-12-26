

//------------------------------------CONSTANTS--------------------------
const GET_ALL = "orders/GET_ALL";
const ADD_ORDER = "orders/ADD_ORDER";
const EDIT_ORDER = "orders/EDIT_ORDER";
const DELETE_ORDER = "orders/DELETE_ORDER";
//-----------------------------------ACTIONS---------------------------------------
const getAll = (all) => ({
    type:GET_ALL,
    payload:all
})

const addOne =(order) =>({
    type: ADD_ORDER,
	payload:order
})

const editOne = (order) =>({
	type: EDIT_ORDER,
	payload:order
})

const deleteOne = (order) => ({
	type: DELETE_ORDER,
	order
});


//-----------------------------------------THUNKS------------------------------------


export const newOrder = (payload, orderId) => async(dispatch) => {
	const response = await fetch(`/api/${orderId}/orders`, {
		method:'POST',
		headers:{
			"Content-Type" : "application/json",
		},
		body:JSON.stringify(payload)
	})


	if(response.ok){
		const orderInfo = await response.json()
		dispatch(addOne(orderInfo))
	}
	else{
		const key = await response.json()
		return await response.json()
	}
}


export const getOrders = () => async (dispatch) => {

	const response = await fetch("/api/orders/")

	if (response.ok) {
		const allOrders = await response.json()
		dispatch(getAll(allOrders));
	}
	else {
		return await response.json()
	}
};

export const editOrder = (payload, orderId) => async(dispatch) => {
	const response = await fetch(`/api/orders/${orderId}/edit`, {
		method:'PUT',
		headers:{
			"Content-Type" : "application/json",
		},
		body:JSON.stringify(payload)
	})

	if(response.ok){
		const updatedOrder = await response.json()
		dispatch(editOne(updatedOrder))
	}
	else{
		return await response.json()
	}
}

export const deleteOrder = (orderId) => async (dispatch) => {
	const response = await fetch(`/api/orders/${orderId}`, {
		method:'DELETE',
		headers:{
			'Content-Type': "application/json"
		}
	})

	if(response.ok){
		dispatch(deleteOne(orderId))
	}

	else{
		return await response.json
	}
}

//-------------------------------------------REDUCER------------------------------------------
function orderReducer(state = {}, action) {
	switch (action.type) {
		case GET_ALL:
			let newState = {...state}
			action.payload.orders.forEach(element=>{
				newState[element.id]=element
			})
			return newState

        case ADD_ORDER:
            let addition = {...state}
			addition[action.payload.customer_id]=action.payload
			return addition

		case EDIT_ORDER:
			let edited = {...state}
			edited[action.payload.id]=action.payload
			return edited

		case DELETE_ORDER:
			let newSt={...state}
			delete newSt[action.order]
			return {
				...newSt
			}

		default:
			return state;
	}
}

export default orderReducer
