import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAdminUser } from "../services/admin";

function Register() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [validationErrors, setValidationErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const registerHandler = (e) => {
		e.preventDefault();

		let error = false;

		if (!name.trim()) {
			setNameError("Name required");
			error = true;
		}

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
		if (!confirmPassword.trim()) {
			setConfirmPasswordError("Confirm password required");
			error = true;
		} else if (password.trim() && confirmPassword.trim() && password !== confirmPassword) {
			setConfirmPasswordError("Passwords do not match");
			error = true;
		}

		if (!error) {
			setIsSubmitting(true);
			let payload = {
				name: name,
				email: email,
				password: password
			};
			createAdminUser(payload)
				.then((r) => {
					navigate("/login");
					toast.success("Successfully registered");
				})
				.catch((e) => {
					console.log(e);
					if (e.response?.data?.status) {
						toast.error(e.response.data.status);
					}
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}
	};

	return (
		<>
			<div className="row justify-content-md-center mt-5">
				<div className="col-4">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title mb-4">Register</h5>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									name="name"
									placeholder="Enter your name"
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										setNameError("");
									}}
								/>
								{nameError && <p className="text-danger">{nameError}</p>}
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email address
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
										setEmailError("");
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
										setPasswordError("");
									}}
								/>
								{passwordError && <p className="text-danger">{passwordError}</p>}
							</div>
							<div className="mb-3">
								<label htmlFor="confirm_password" className="form-label">
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control"
									id="confirm_password"
									name="confirm_password"
									placeholder="Re-enter password"
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										setConfirmPasswordError("");
									}}
								/>
								{confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
							</div>
							<div className="d-grid gap-2">
								<button
									onClick={registerHandler}
									disabled={isSubmitting}
									className={`btn btn-${isSubmitting ? "secondary" : "primary"} btn-block`}
								>
									Register Now
								</button>
								<p className="text-center">
									Have already an account <Link to="/login">Login here</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
