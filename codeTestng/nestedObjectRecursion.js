const nestedObj = {
	one: {
		route: {
			path: "/Kids/character/:id",
			keys: [
				{
					name: "id",
					prefix: "/",
					delimiter: "/",
					optional: false,
					repeat: false,
					partial: false,
					asterisk: false,
					pattern: "[^\\/]+?"
				}
			],
			regex: {}
		},
		components: [null, null, { stub: true }],
		uiView: "characterDetails"
	},
	two: {
		route: {
			path: "/Kids/title/:id",
			keys: [
				{
					name: "id",
					prefix: "/",
					delimiter: "/",
					optional: false,
					repeat: false,
					partial: false,
					asterisk: false,
					pattern: "[^\\/]+?"
				}
			],
			regex: {}
		},
		components: [null, null, null],
		uiView: "movieDetails"
	},
	three: {
		route: { path: "/browse/new-releases", keys: [], regex: {} },
		components: [null, null, null],
		uiView: "NewReleases",
		view: "browseTitlesGallery"
	},
	four: {
		route: { path: "/browse/new-arrivals", keys: [], regex: {} },
		components: [
			"<Component_ABC/>",
			"<Component_ZDX/>",
			"<Component_VCB/>"
		],
		uiView: "NewReleases",
		view: "browseTitlesGallery"
	}
};

//function that goes through all objects and nested objects, finds a property and appends some value to it
function traversal(obj, property) {
	for (const key in obj) {
		console.log("current key: ", key);

		if (key === property) {
			console.log("FOUND THE PROPERTY: ", obj[key]);
		}

		if (isObject(obj[key])) {
			console.log("property is an object - recursion...");
			traversal(obj[key], property);
		}

		console.log(property, " - not found");
	}
}

//determine if is an object:
function isObject(object) {
	if (object === null) {
		return false;
	}
	return (
		typeof object !== "function" &&
		!Array.isArray(object) &&
		typeof object === "object"
	);
}

traversal(nestedObj, "uiView");
