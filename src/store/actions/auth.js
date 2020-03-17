import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const API_KEY = "AIzaSyBTkyW_r2_PTRiT9bd_FiiRT8wqXdRbIzs";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());

		const authData = {
			email,
			password,
			returnSecureToken: true
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
		if (!isSignup) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
		}

		axios
			.post(url, authData)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch(error => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};

export const signIn = (email, password) => {
	return dispatch => {
		const authData = { email, password };
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
				authData
			)
			.then(response => {
				// on sign in success:
				dispatch();
			})
			.catch(error => {
				//on sign in error:
				dispatch();
			});
	};
};
