import React, { Component } from "react";
import axios from "../../axiosOrders";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};
	//from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = ingredients => {
		const sum = Object.values(ingredients).reduce((sum, element) => {
			return sum + element;
		}, 0);

		return sum > 0;
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
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = { ...this.props.ings };

		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? (
			<p>Ingredients can't be loaded.</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						canPurchase={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName =>
			dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: ingredientName =>
			dispatch(actions.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
