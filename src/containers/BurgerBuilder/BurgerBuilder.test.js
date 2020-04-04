import React from "react";
import { shallow } from "enzyme";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

describe("<BurgerBuilder/>", () => {
	let wrapper;
	const ings = {
		salad: 1,
		bacon: 1,
		cheese: 1,
		meat: 1,
	};

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={jest.fn()} />);
	});

	it("should render BuildControls when receiving ingredients `props.ings`", () => {
		wrapper.setProps({ ings });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});

	it("should render Burger when receiving ingredients `props.ings`", () => {
		wrapper.setProps({ ings });
		expect(wrapper.find(Burger)).toHaveLength(1);
	});
});
