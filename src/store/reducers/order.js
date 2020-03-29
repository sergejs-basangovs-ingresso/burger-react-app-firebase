import * as actionTypes from "../actions/actionTypes";
import * as utility from "../../shared/utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
	const newOrder = utility.updateObject(action.orderData, {
		id: action.orderId
	});

	return {
		...state,
		loading: false,
		purchased: true,
		orders: state.orders.concat(newOrder)
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return utility.updateObject(state, { loading: true });

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);

		case actionTypes.PURCHASE_BURGER_FAIL:
			return utility.updateObject(state, { loading: false });

		case actionTypes.PURCHASE_INIT:
			return utility.updateObject(state, { purchased: false });

		case actionTypes.FETCH_ORDERS_START:
			return utility.updateObject(state, { loading: true });

		case actionTypes.FETCH_ORDERS_FAIL:
			return utility.updateObject(state, { loading: false });

		case actionTypes.FETCH_ORDERS_SUCCESS:
			return utility.updateObject(state, {
				loading: false,
				orders: action.orders
			});
		// here we do not copy all prev orders - we need to keep just the ones that are currently in db {

		case actionTypes.DELETE_ORDER_START:
			return utility.updateObject(state, { loading: true });

		case actionTypes.DELETE_ORDER_FAIL:
			return utility.updateObject(state, { loading: false });

		default:
			return state;
	}
};

export default reducer;
