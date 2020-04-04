import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
	let initialState;
	beforeEach(() => {
		initialState = {
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/",
		};
	});

	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should store token upon login", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.AUTH_SUCCESS,
				idToken: 123,
				userId: 456,
			})
		).toEqual({
			token: 123,
			userId: 456,
			error: null,
			loading: false,
			authRedirectPath: "/",
		});
	});
});
