const constructIngredient = (name, number) => {
	return { ingredient: name, number };
};

const ingredients = {
	salad: 1,
	bacon: 2,
	cheese: 1,
	meat: 3
};

const items = [
	{ id: 1, name: "grape" },
	{ id: 11, name: "banana" },
	{ id: 12, name: "tomato" },
	{ id: 21, name: "pineapple" },
	{ id: 22, name: "peach" },
	{ id: 56, name: "grapefruit" }
];

const transformedIng = Object.keys(ingredients)
	.map(ingName =>
		[...Array(ingredients[ingName])].map((_, index) =>
			constructIngredient(ingName, index)
		)
	)
	.reduce((arr, element) => {
		return [...arr, ...element];
	}, []);

// console.log("transformedIng:", transformedIng);

const ascendingNumbers = [...items].sort((a, b) => {
	return a.id - b.id;
});

const descendingNumbers = [...items].sort((a, b) => {
	return b.id - a.id;
});

console.log("items :", items);
console.log("ascendingNumbers :", ascendingNumbers);
console.log("descendingNumbers :", descendingNumbers);
