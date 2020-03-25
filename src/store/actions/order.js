import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";
import * as utility from "../utility";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post("/orders.json?auth=" + token, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error
	};
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get("/orders.json?auth=" + token)
			.then(res => {
				const orders = utility.convertResponse(res.data);
				dispatch(fetchOrdersSuccess(orders));
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error));
			});
	};
};

export const deleteOrderStart = () => {
	return {
		type: actionTypes.DELETE_ORDER_START
	};
};

export const deleteOrderSuccess = () => {
	return {
		type: actionTypes.DELETE_ORDER_SUCCESS
	};
};

export const deleteOrderFail = error => {
	return {
		type: actionTypes.DELETE_ORDER_FAIL,
		error
	};
};

export const deleteOrder = (id, token) => {
	return dispatch => {
		dispatch(deleteOrderStart());
		axios
			.delete(`/orders/${id}.json?auth=${token}`)
			.then(res => {
				dispatch(fetchOrders(token));
			})
			.catch(error => {
				dispatch(deleteOrderFail(error));
			});
	};
};
