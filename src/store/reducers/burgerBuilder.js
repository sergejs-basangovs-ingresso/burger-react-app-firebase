import * as actionTypes from "../actions/actionTypes";
import * as utility from "../utility";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const addIngredient = (state, action) => {
	const newIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	};
	const newIngredients = utility.updateObject(
		state.ingredients,
		newIngredient
	);
	const newTotalPrice =
		state.totalPrice + INGREDIENT_PRICES[action.ingredientName];

	return utility.updateObject(state, {
		ingredients: newIngredients,
		totalPrice: newTotalPrice
	});
};

const removeIngredient = (state, action) => {
	const newIng = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	};
	const newIngs = utility.updateObject(state.ingredients, newIng);
	const newPrice =
		state.totalPrice > 4
			? state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			: state.totalPrice;

	return utility.updateObject(state, {
		ingredients: newIngs,
		totalPrice: newPrice
	});
};

const setIngredients = (state, action) => {
	const initialIngs = {
		salad: action.ingredients.salad,
		bacon: action.ingredients.bacon,
		cheese: action.ingredients.cheese,
		meat: action.ingredients.meat
	};

	return utility.updateObject(state, {
		ingredients: initialIngs,
		totalPrice: 4,
		error: false
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);

		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return utility.updateObject(state, { error: true });

		default:
			return state;
	}
};

export default reducer;
