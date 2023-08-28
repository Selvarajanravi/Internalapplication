import React from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Router() {
	const [cookies] = useCookies(["token"]);
	console.log(cookies);
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={cookies.token ? <Dashboard /> : <Navigate to="/login" />} />
				<Route path="/register" element={!cookies.token ? <Register /> : <Navigate to="/" />} />
				<Route path="/login" element={!cookies.token ? <Login /> : <Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
