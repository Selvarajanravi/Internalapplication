import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../services/admin";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cookies, setCookie] = useCookies(["token"]);

	const loginHandler = (e) => {
		e.preventDefault();
		setValidationErrors({});
		setIsSubmitting(true);
		let payload = {
			email: email,
			password: password
		};
		adminLogin(payload)
			.then((r) => {
				setCookie("token", r.data.token);
				navigate("/");
			})
			.catch((e) => {
				// setIsSubmitting(false);
				// if (e.response.data.errors != undefined) {
				// 	setValidationErrors(e.response.data.errors);
				// }
				// if (e.response.data.error != undefined) {
				// 	setValidationErrors(e.response.data.error);
				// }
				alert("you don't have access");
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<>
			<div className="row justify-content-md-center mt-5">
				<div className="col-4">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title mb-4">Sign In</h5>
							<form onSubmit={loginHandler}>
								{Object.keys(validationErrors).length != 0 && (
									<p className="text-center ">
										<small className="text-danger">Incorrect Email or Password</small>
									</p>
								)}

								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										value={email}
										required
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="password"
										value={password}
										required
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<div className="d-grid gap-2">
									<button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
										Login
									</button>
									<p className="text-center">
										Don't have account? <Link to="/register">Register here</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
