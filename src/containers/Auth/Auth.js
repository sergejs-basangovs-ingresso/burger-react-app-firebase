import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

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
		}
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

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedControls = { ...this.state.controls };

		const updatedControlsElement = {
			...updatedControls[inputIdentifier]
		};

		updatedControlsElement.value = event.target.value;

		updatedControlsElement.valid = this.checkValidity(
			updatedControlsElement.value,
			updatedControlsElement.validation
		);

		updatedControlsElement.touched = true;

		updatedControls[inputIdentifier] = updatedControlsElement;

		let formIsValid = true;
		for (const key in updatedControls) {
			formIsValid = updatedControls[key].valid && formIsValid;
		}

		this.setState({
			controls: updatedControls,
			formIsValid
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
				<form>
					{form}
					<div>
						<Button buttonType="Success">SUBMIT</Button>
					</div>
				</form>
			</div>
		);
	}
}

export default Auth;
