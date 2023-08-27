import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = () => {
		axios
			.get("/api/user", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
			.then((r) => {
				setUser(r.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// const logoutAction = () => {
	// 	axios
	// 		.post("/api/logout", {}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
	// 		.then((r) => {
	// 			localStorage.setItem("token", "");
	// 			navigate("/");
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// };
	const logoutHandler = (e) => {
		e.preventDefault();
		removeCookie("token");
		navigate("/");
	};

	return (
		<>
			<div className="row justify-content-md-center">
				<div className="col-12">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container-fluid">
							<a className="navbar-brand" href="#">
								Dashboard
							</a>
							<div className="d-flex">
								<ul className="navbar-nav">
									<li className="nav-item">
										<a onClick={logoutHandler} className="nav-link " aria-current="page" href="#">
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<h2 className="text-center mt-5">Welcome, {user.name}!</h2>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
