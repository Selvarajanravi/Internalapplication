import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAdminUser } from "../services/admin";

function Register() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const registerHandler = (e) => {
		e.preventDefault();
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
	};

	return (
		<>
			<div className="row justify-content-md-center mt-5">
				<div className="col-4">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title mb-4">Register</h5>
							<form onSubmit={registerHandler} autoComplete="off">
								<div className="mb-3">
									<label htmlFor="name" className="form-label">
										Name
									</label>
									<input
										type="text"
										className="form-control"
										id="name"
										name="name"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
									{validationErrors.name != undefined && (
										<div className="flex flex-col">
											<small className="text-danger">{validationErrors.name[0]}</small>
										</div>
									)}
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
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
									{validationErrors.email != undefined && (
										<div className="flex flex-col">
											<small className="text-danger">{validationErrors.email[0]}</small>
										</div>
									)}
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
										onChange={(e) => setPassword(e.target.value)}
									/>
									{validationErrors.password != undefined && (
										<div className="flex flex-col">
											<small className="text-danger">{validationErrors.password[0]}</small>
										</div>
									)}
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
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									{password !== confirmPassword && (
										<div className="flex flex-col">
											<small className="text-danger">Passwords do not match</small>
										</div>
									)}
								</div>
								<div className="d-grid gap-2">
									<button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
										Register Now
									</button>
									<p className="text-center">
										Have already an account <Link to="/login">Login here</Link>
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

export default Register;
