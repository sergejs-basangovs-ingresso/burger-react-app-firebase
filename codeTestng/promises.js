// creating a promise:
let keepHisWord = true;
const promiseOne = new Promise((resolve, reject) => {
	if (keepHisWord) {
		resolve("Man can keep his word.");
	} else {
		reject("Cannot keep his word.");
	}
});

console.log("promiseOne :", promiseOne);

const promiseTwo = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({
			message: "Man likes to keep his word.",
			code: "aManKeepsHisWord"
		});
	}, 3000);
});

(async () => {
	const response = await promiseTwo;
	console.log("promiseTwo resolved: ", response);
})();

const returnSomeData = () => {
	const random = Math.round(10 * Math.random());
	return new Promise((resolve, reject) => {
		if (random < 5) {
			setTimeout(() => {
				resolve({
					data: "some valuable info here...",
					id: 12345,
					delivered: true
				});
			}, 4000);
		} else {
			setTimeout(() => {
				reject(new Error("404 Wrong Request. Error simulation."));
			}, 4000);
		}
	});
};

returnSomeData()
	.then(response => {
		console.log("response data :", response.data);
	})
	.catch(error => {
		console.log(error);
	});

//OR

const returnSomeOtherData = () => {
	const random = Math.round(10 * Math.random());

	const information = `Я помню чудное мгновенье:
  Передо мной явилась ты,
  Как мимолетное виденье,
  Как гений чистой красоты.`;

	return new Promise((resolve, reject) => {
		if (random <= 5) {
			setTimeout(() => {
				resolve({ data: information, id: Date.now(), art: true });
			}, 2000);
		} else {
			setTimeout(() => {
				reject("No poetry this time! Ha-ha!");
			}, 2000);
		}
	});
};

(async () => {
	try {
		const poetry = await returnSomeOtherData();
		console.log(poetry.data);
	} catch (error) {
		console.log("poetry: ", error);
	}
})();
