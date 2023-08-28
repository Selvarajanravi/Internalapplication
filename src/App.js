import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";

function App() {
	return (
		<CookiesProvider>
			<ToastContainer />
			<Router />
		</CookiesProvider>
	);
}

export default App;
