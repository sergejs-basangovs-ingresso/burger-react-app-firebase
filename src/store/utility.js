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
