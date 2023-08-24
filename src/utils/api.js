import axios from "axios";

const apiUrl = "https://technorucswalkinapi.azurewebsites.net";

const api = axios.create({ baseURL: apiUrl });

export default api;
