import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends Component {
	//This could be a functional component.

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	render() {
		return (
			<Aux>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show
							? "translateY(0)"
							: "translateY(-100vh)",
						opacity: this.props.show ? "1" : "0"
					}}
				>
					{this.props.children}
				</div>
				<Backdrop
					show={this.props.show}
					click={this.props.modalClosed}
				/>
			</Aux>
		);
	}
}

export default Modal;
