import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
	const ingredients = Object.keys(props.ingredients).map(ingName => {
		return (
			<li key={ingName}>
				<span style={{ textTransform: "capitalize" }}>{ingName}</span>:{" "}
				{props.ingredients[ingName]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Your Order.</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredients}</ul>
			<p>
				<strong>Total price: ${props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>
			<Button clicked={props.purchaseCanceled} buttonType="Danger">
				CANCEL
			</Button>
			<Button clicked={props.purchaseContinued} buttonType="Success">
				CONTINUE
			</Button>
		</Aux>
	);
};

export default OrderSummary;
