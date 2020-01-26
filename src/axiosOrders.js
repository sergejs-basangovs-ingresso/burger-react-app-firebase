import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-my-burger-15d1e.firebaseio.com/"
});

export default instance;
