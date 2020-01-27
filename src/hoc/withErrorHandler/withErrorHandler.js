import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				error: null
			};
		}

		componentDidMount() {
			axios.interceptors.request.use(req => {
				//when I send request I want to clear all error in state
				this.setState({ error: null });
				return req;
			});
			axios.interceptors.response.use(
				res => res,
				error => {
					// when I receive an error, I set it in state
					this.setState({ error: error });
				}
			);
		}

		errorConfirmedHandler = () => {
			this.setState({
				error: null
			});
		};

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
