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
			//the axios interceptors can be initiated within the constructor
			//as well as within the componentWillMount - (which is deprecated)
			this.reqInterceptor = axios.interceptors.request.use(req => {
				//when I send request I want to clear all error in state
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					// when I receive an error, I set it in state
					this.setState({ error: error });
				}
			);
		}
		// we shall remove axios interceptors from CDM - because if any child components will have their http call from within their CDM
		// and if error will return - this container component will not capture it - as their components will mount before this container's
		// CDM will mount.

		// componentDidMount() {
		// 	axios.interceptors.request.use(req => {
		// 		this.setState({ error: null });
		// 		return req;
		// 	});
		// 	axios.interceptors.response.use(
		// 		res => res,
		// 		error => {
		// 			this.setState({ error: error });
		// 		}
		// 	)
		// }

		componentWillUnmount() {
			//remove interceptors when container component will unmount
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
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
