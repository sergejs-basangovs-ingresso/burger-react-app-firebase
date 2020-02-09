import React, { Component } from "react";
import axios from "../../../axiosOrders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: ""
		},
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Serge Basangovs",
				address: {
					street: "123 Jump street",
					zipCode: "WD12 3LK",
					country: "United Kingdom"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
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

		console.log("Order processing: ", this.props.ingredients);
	};

	render() {
		let form = (
			<form>
				<input
					className={classes.Input}
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<input
					className={classes.Input}
					type="email"
					name="email"
					placeholder="Your Email"
				/>
				<input
					className={classes.Input}
					type="text"
					name="street"
					placeholder="Street and number"
				/>
				<input
					className={classes.Input}
					type="text"
					name="postcode"
					placeholder="postal code"
				/>
				<div>
					<Button buttonType="Success" clicked={this.orderHandler}>
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
