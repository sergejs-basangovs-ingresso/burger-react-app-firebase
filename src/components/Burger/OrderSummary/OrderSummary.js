import React from "react";
import Aux from "../../../hoc/Aux";

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
			<p>Continue to checkout?</p>
		</Aux>
	);
};

export default OrderSummary;
