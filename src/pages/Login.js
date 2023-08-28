import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminLogin } from "../services/admin";

function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [validationErrors, setValidationErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cookies, setCookie] = useCookies(["token"]);

	const loginHandler = (e) => {
		e.preventDefault();

		let error = false;

		if (!email.trim()) {
			setEmailError("Email address is required.");
			error = true;
		} else if (!email.trim().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
			setEmailError("Invalid email format.");
			error = true;
		}

		if (!password.trim()) {
			setPasswordError("Password is required.");
			error = true;
		} else if (password.includes(" ")) {
			setPasswordError("Password should not contain blank spaces.");
			error = true;
		}

		if (!error) {
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
					console.log(e);
					if (e.response?.data?.status) {
						toast.warning(e.response.data.status);
					}
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-md-center mt-5 ">
				<div className="col-5">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title mb-4 text-primary text-center">Sign In</h5>
							{Object.keys(validationErrors).length != 0 && (
								<p className="text-center ">
									<small className="text-danger">Incorrect Email or Password</small>
								</p>
							)}

							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									placeholder="Enter email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
								{emailError && <p className="text-danger">{emailError}</p>}
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
									placeholder="Enter password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
								{passwordError && <p className="text-danger">{passwordError}</p>}
							</div>
							<div className="d-grid gap-2">
								<button
									onClick={loginHandler}
									disabled={isSubmitting}
									className={`btn btn-${isSubmitting ? "secondary" : "primary"} btn-block`}
								>
									Login
								</button>
								<p className="text-center">
									Don't have account? <Link to="/register">Register here</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
