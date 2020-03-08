import React from "react";
import Button from "../UI/Button/Button";
import classes from "./Order.module.css";

const Order = props => {
	const ingredients = [];
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}
	const ingredientOutput = ingredients.map(ig => {
		return (
			<span
				key={ig.name}
				style={{
					textTransform: "capitalize",
					display: "inline-block",
					margin: "0 8px",
					border: "1px solid #ccc",
					padding: "5px"
				}}
			>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	const customerData = (
		<details>
			<summary>Customer:</summary>
			<p>
				<b>Name: </b> {props.customerData.name}
			</p>
			<p>
				<b>Street: </b> {props.customerData.street}
			</p>
			<p>
				<b>Postcode: </b> {props.customerData.zipCode}
			</p>
			<p>
				<b>Country: </b> {props.customerData.country}
			</p>
			<p>
				<b>Delivery method: </b> {props.customerData.deliveryMethod}
			</p>
		</details>
	);

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>$ {props.price.toFixed(2)}</strong>
			</p>
			<Button buttonType="Danger" clicked={props.deleteOrder}>
				Delete Order
			</Button>
			{customerData}
		</div>
	);
};

export default Order;
