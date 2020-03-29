import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const API_KEY = "AIzaSyBTkyW_r2_PTRiT9bd_FiiRT8wqXdRbIzs";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error
	};
};

export const logout = () => {
	//remove from local storage:
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("expirationDate");
	window.localStorage.removeItem("userId");

	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
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

				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);

				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);

				dispatch(checkAuthTimeout(response.data.expiresIn));

				//set the token in local storage:
				window.localStorage.setItem("token", response.data.idToken);
				window.localStorage.setItem("expirationDate", expirationDate);
				window.localStorage.setItem("userId", response.data.localId);
			})
			.catch(error => {
				console.log(error);
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = window.localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				window.localStorage.getItem("expirationDate")
			);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = window.localStorage.getItem("userId");
				const timeout = Math.floor(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				);

				dispatch(authSuccess(token, userId));

				dispatch(checkAuthTimeout(timeout));
			}
		}
	};
};
