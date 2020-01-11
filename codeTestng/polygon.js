const constructIngredient = (name, number) => {
	return { ingredient: name, number };
};

const ingredients = {
	salad: 1,
	bacon: 2,
	cheese: 1,
	meat: 3
};

const transformedIng = Object.keys(ingredients)
	.map(ingName =>
		[...Array(ingredients[ingName])].map((_, index) =>
			constructIngredient(ingName, index)
		)
	)
	.reduce((arr, element) => {
		return [...arr, ...element];
	}, []);

console.log("transformedIng:", transformedIng);
