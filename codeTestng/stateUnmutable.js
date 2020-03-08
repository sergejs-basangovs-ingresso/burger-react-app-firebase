const initialState = {
	orders: [],
	loading: false,
	error: null
};

const action = {
	type: "POST_SUCCESS",
	orderId: "sgksgh1123123",
	orderData: {
		bacon: 1,
		salad: 1,
		cheese: 3,
		meat: 1
	}
};

const updateUnmutable = (state = initialState, action) => {
	switch (action.type) {
		case "POST_SUCCESS":
			return {
				...state,
				orders: [
					...state.orders,
					{ ...action.orderData, id: action.orderId }
				]
			};
		default:
			break;
	}
};

// const newState = updateUnmutable(undefined, action);

// console.log("newState", newState);

const updateObject = (object, newValue) => {
	return { ...object, ...newValue };
};

const state = {
	fname: "John",
	lname: "Doe"
};

console.log(updateObject(state, { lname: "Perkins" }));
