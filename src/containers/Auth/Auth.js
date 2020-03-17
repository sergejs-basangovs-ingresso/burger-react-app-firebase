import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/auth";

import classes from "./Auth.module.scss";

export class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your email"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
					minLength: 5,
					maxLength: 50
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
					maxLength: 20
				},
				valid: false,
				touched: false
			}
		},
		formIsValid: false,
		isSignup: true
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.trim().length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true
			}
		};
		let formIsValid = true;
		for (const key in updatedControls) {
			formIsValid = updatedControls[key].valid && formIsValid;
		}

		this.setState({
			controls: updatedControls,
			formIsValid
		});
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignup: !prevState.isSignup };
		});
	};

	render() {
		const formElementsArray = [];

		for (const key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const form = formElementsArray.map(formElement => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={event =>
					this.inputChangedHandler(event, formElement.id)
				}
				touched={formElement.config.touched}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
			/>
		));

		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{form}
					<div>
						<Button buttonType="Success">SUBMIT</Button>
						<Button
							buttonType="Danger"
							clicked={this.switchAuthModeHandler}
						>
							SWITCH TO{" "}
							{this.state.isSignup ? "SIGN IN" : "SIGN UP"}
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup))
	};
};

export default connect(null, mapDispatchToProps)(Auth);
