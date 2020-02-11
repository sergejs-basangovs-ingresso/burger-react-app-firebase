import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = props => {
	const ingNames = Object.keys(props.ingredients).reverse();

	let transformedIngredients = ingNames
		.map(name =>
			[...Array(props.ingredients[name])].map((_, i) => (
				<BurgerIngredient key={name + i} type={name} />
			))
		)
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please, start adding ingredients!</p>;
	}

	//ingredients: { salad: 1, bacon: 1, cheese: 2, meat: 2 }

	// Object.keys(props.ingredients) = ['salad', 'bacon', 'cheese', 'meat']

	// Array(ingredients['cheese']) = [undefined, undefined] - it will render  2 times the Component with type="cheese"

	// ['salad', 'bacon', 'cheese', 'meat'].map(name=> [...Array(ingredients[name])].map( (_, index) => ( <BurgerIngredient key={name + index} type={name} />) ) )

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
