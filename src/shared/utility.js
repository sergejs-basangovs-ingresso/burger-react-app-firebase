//helper function: converts response from firebase db object -> array:
export const convertResponse = response => {
	const result = [];
	for (const key in response) {
		result.push({ ...response[key], id: key });
	}

	return result;
};

//un-mutable update object:
export const updateObject = (object, newProperties) => {
	return { ...object, ...newProperties };
};

//validation:
export const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules.required) {
		isValid = value.trim() !== "" && isValid;
	}

	if (rules.minLength) {
		isValid = value.trim().length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.trim().length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};
