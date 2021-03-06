import * as actionTypes from "../actions/actionTypes";
import axios from "../../axiosOrders";

export const addIngredient = ingredientName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName
	};
};

export const removeIngredient = ingredientName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios
			.get(
				"https://react-my-burger-15d1e.firebaseio.com/ingredients.json"
			)
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				console.log(error);
				dispatch(fetchIngredientsFailed());
			});
	};
};
