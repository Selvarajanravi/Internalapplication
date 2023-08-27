import axios from "axios";

const apiUrl = "https://technorucswalkinapi.azurewebsites.net/api/";
const api = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	}
});
export default api;
