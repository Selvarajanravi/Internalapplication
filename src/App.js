import { CookiesProvider } from "react-cookie";
import Router from "./Router";

function App() {
	return (
		<CookiesProvider>
			<Router />
		</CookiesProvider>
	);
}

export default App;
