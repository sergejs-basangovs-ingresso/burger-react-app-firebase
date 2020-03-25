import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axiosOrders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token);
	}

	deleteOrderHandler = id => {
		this.props.onDeleteOrder(id, this.props.token);
	};

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders =
				this.props.orders.length > 0 ? (
					this.props.orders.map(order => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
							customerData={order.orderData}
							deleteOrder={() =>
								this.deleteOrderHandler(order.id)
							}
						/>
					))
				) : (
					<p>Currently there are no active orders.</p>
				);
		}
		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: token => dispatch(actions.fetchOrders(token)),
		onDeleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
