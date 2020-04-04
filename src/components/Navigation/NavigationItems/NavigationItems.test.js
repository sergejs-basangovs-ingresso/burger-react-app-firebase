import React from "react";
import { shallow } from "enzyme";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

describe("<NavigationItems/>", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it("should render 2 <NavigationItem/> elements if not authenticated", () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it("should render 3 <NavigationItem/> elements if authenticated ", () => {
		// wrapper = shallow(<NavigationItems isAuthenticated />);
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it("should render <NavigationItem link='/logout'>Logout</NavigationItem> element if authenticated ", () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(
			wrapper.contains(
				<NavigationItem link="/logout">Logout</NavigationItem>
			)
		).toEqual(true);
	});
});
