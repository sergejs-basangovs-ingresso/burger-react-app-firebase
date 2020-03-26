import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = props => {
	let authentication = (
		<NavigationItem link="/auth">Authenticate</NavigationItem>
	);

	if (props.isAuthenticated) {
		authentication = <NavigationItem link="/logout">Logout</NavigationItem>;
	}

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Burger Builder
			</NavigationItem>
			<NavigationItem link="/orders">Orders</NavigationItem>
			{authentication}
		</ul>
	);
};

export default NavigationItems;
