const myData = [
	{
		route: {
			path: "/Kids/character/:id",
			_keys: [
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
			_regex: {}
		},
		components: [null, null, { stub: true }],
		uiView: "characterDetails"
	},
	{
		route: {
			path: "/Kids/title/:id",
			_keys: [
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
			_regex: {}
		},
		components: [null, null, null],
		uiView: "movieDetails"
	},
	{
		route: { path: "/browse/new-releases", _keys: [], _regex: {} },
		components: [null, null, null],
		uiView: "NewReleases",
		view: "browseTitlesGallery"
	},
	{
		route: { path: "/browse/new-arrivals", _keys: [], _regex: {} },
		components: [
			"<Component_ABC/>",
			"<Component_ZDX/>",
			"<Component_VCB/>"
		],
		uiView: "NewReleases",
		view: "browseTitlesGallery"
	}
];
const [one, two, three, four] = myData;

console.log(four);

//get a nested data
const {
	route: { path },
	components
} = four;

console.log("path: ", path);
console.log("components: ", ...components);

//get a nested data + rename
const {
	route: { path: link }
} = four;

console.log("link: ", link);
