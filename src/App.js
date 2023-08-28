import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";

function App() {
	return (
		<CookiesProvider>
			<Router />
		</CookiesProvider>
	);
}

export default App;
