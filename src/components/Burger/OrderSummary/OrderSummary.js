import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
	//This could be a functional component.

	render() {
		const ingredients = Object.keys(this.props.ingredients).map(ingName => {
			return (
				<li key={ingName}>
					<span style={{ textTransform: "capitalize" }}>
						{ingName}
					</span>
					: {this.props.ingredients[ingName]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Your Order.</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredients}</ul>
				<p>
					<strong>Total price: ${this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to checkout?</p>
				<Button
					clicked={this.props.purchaseCanceled}
					buttonType="Danger"
				>
					CANCEL
				</Button>
				<Button
					clicked={this.props.purchaseContinued}
					buttonType="Success"
				>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
