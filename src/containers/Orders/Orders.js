import React, { Component } from "react";
import axios from "../../axiosOrders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get("/orders.json")
			.then(res => {
				this.setState({
					orders: this.convertResponse(res.data),
					loading: false
				});
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	}

	// convertResponse = response => {
	// 	const orderReferences = Object.keys(response);
	// 	const values = Object.values(response);
	// 	const result = values.reduce((accumulator, current, index) => {
	// 		const item = { ...current, id: orderReferences[index] };
	// 		return [...accumulator, item];
	// 	}, []);
	// 	return result;
	// };

	convertResponse = response => {
		const result = [];
		for (const key in response) {
			result.push({ ...response[key], id: key });
		}

		return result;
	};

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
						customerData={order.orderData}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
