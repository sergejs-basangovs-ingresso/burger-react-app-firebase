import React, { Component } from "react";
import axios from "../../../axiosOrders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your name"
				},
				value: "",
				validation: {
					required: true,
					minLength: 2,
					maxLength: 50
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Postcode"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your email"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "standard", displayValue: "Standard" }
					]
				},
				value: "standard",
				validation: {},
				valid: true
			}
		},
		formIsValid: false,
		loading: false
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

		return isValid;
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (const formDataIdentifier in this.state.orderForm) {
			formData[formDataIdentifier] = this.state.orderForm[
				formDataIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};

		axios
			.post("/orders.json", order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = { ...this.state.orderForm };
		const updatedFormElement = {
			...updatedForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (const key in updatedForm) {
			formIsValid = updatedForm[key].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedForm,
			formIsValid
		});
	};

	render() {
		const formElementsArray = [];

		for (const key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
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
				))}
				<div>
					<Button
						buttonType="Success"
						disabled={!this.state.formIsValid}
					>
						ORDER
					</Button>
				</div>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact details.</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
