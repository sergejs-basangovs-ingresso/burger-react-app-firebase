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
import * as actionTypes from "../../store/actions";

export class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
	};
	//from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

	componentDidMount() {
		// axios
		// 	.get(
		// 		"https://react-my-burger-15d1e.firebaseio.com/ingredients.json"
		// 	)
		// 	.then(response => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 		this.setState({ error: true });
		// 	});
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
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = { ...this.props.ings };

		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? (
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

		if (this.state.loading) {
			orderSummary = <Spinner />;
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
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
		onIngredientRemoved: ingredientName =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
