import React, { Component } from "react";
import axios from "../../axiosOrders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
			totalPrice: 4,
			canPurchase: false,
			purchasing: false
		};
	}

	updatePurchaseState = ingredients => {
		const sum = Object.values(ingredients).reduce((sum, element) => {
			return sum + element;
		}, 0);

		this.setState({
			canPurchase: sum > 0
		});
	};

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
		this.updatePurchaseState(updatedIngredients);
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
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		// alert("continue purchase.");
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Serge Basangovs",
				address: {
					street: "123 Jump street",
					zipCode: "WD12 3LK",
					country: "United Kingdom"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};
		axios
			.post("/orders.json", order)
			.then(response => {
				console.log("response POST purchase :", response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					canPurchase={this.state.canPurchase}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
