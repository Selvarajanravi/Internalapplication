import api from "../utils/api";

const module = "Admin";
export async function adminLogin(payload) {
	return api.post(module + "/AdminLogin", payload);
}
