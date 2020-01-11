import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

export class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4
		};
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + INGREDIENT_PRICES[type];

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice > 4 ? oldPrice - INGREDIENT_PRICES[type] : 4;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
	};

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
