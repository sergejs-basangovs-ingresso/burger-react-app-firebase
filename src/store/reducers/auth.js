import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return { ...state };
		case actionTypes.AUTH_FAIL:
			return { ...state };
		case actionTypes.AUTH_SUCCESS:
			return { ...state };
		default:
			break;
	}
};

export default reducer;
