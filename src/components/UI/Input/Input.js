import React from "react";
import classes from "./Input.module.css";

const Input = props => {
	let inputElement = null;
	let validationError = null;
	const inputClasses = [classes.InputElement];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
		validationError = (
			<p className={classes.ValidationError}>
				please, enter a valid value
			</p>
		);
	}

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					{...props.elementConfig}
					value={props.value}
					className={inputClasses.join(" ")}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			inputElement = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option value={option.value} key={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		case "textarea":
			inputElement = (
				<textarea
					{...props.elementConfig}
					className={inputClasses.join(" ")}
					onChange={props.changed}
				/>
			);
			break;
		default:
			inputElement = (
				<input
					{...props.elementConfig}
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default Input;
