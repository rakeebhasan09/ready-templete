import React, { use, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
	const [show, setShow] = useState(false);
	const { setUser, emailPasswordRegistration } = use(AuthContext);
	const navigate = useNavigate();
	// Handle Registration
	const handleRegistration = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const photo = e.target.photo.value;
		const password = e.target.password.value;

		// Name Regex Pattern
		const namePatter = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
		if (!namePatter.test(name)) {
			toast.warn("Name Content Letters Only!");
			return;
		}

		// Email Regex Pattern
		const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
		if (!emailPattern.test(email)) {
			toast.warn("You must need to provide ends with @gmail.com!");
			return;
		}

		// Photo Validation
		if (!photo) {
			toast.warn("You must need to provide Photo URL");
			return;
		}

		// Password Regex Pattern
		const passwordPattern =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+=^()_-])[A-Za-z\d@$!%*?&#+=^()_-]{6,}$/;
		if (!passwordPattern.test(password)) {
			Swal.fire({
				title: "Wrong Password Format!",
				text: "Password must be at least 6 characters, one uppercase, one lowercase, one number, and one special character",
				icon: "error",
			});
			return;
		}

		emailPasswordRegistration(email, password)
			.then((result) => {
				if (result.user) {
					result.user.displayName = name;
					result.user.photoURL = photo;
					setUser(result.user);
					e.target.reset();
					navigate("/");
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Registration Successfull.",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				const message = error.message;
				const modifiedMessage = message
					.split("/")[1]
					.replaceAll("-", " ")
					.replace(")", "");
				toast.error(modifiedMessage);
			});
	};
	return (
		<section className="py-10 md:py-20">
			<div className="container">
				<div className="card bg-base-100 w-full mx-auto p-5 md:p-10 max-w-[492px] shrink-0 shadow-2xl">
					<h1 className="text-[32px] text-center font-semibold">
						Register Now!
					</h1>
					<p className="text-center ">
						Already have an account?{" "}
						<Link to="/login" className="gradient-text">
							Login Now
						</Link>
					</p>
					<div className="card-body p-0">
						<form onSubmit={handleRegistration}>
							<fieldset className="fieldset mt-6">
								<label className="label text-primary font-medium text-[14px]">
									Name
								</label>
								<input
									type="text"
									className="input outline-none border border-[#E9E9E9] rounded w-full py-2 pl-3 shadow-0 text-primary opacity-[0.5]"
									placeholder="Mariam Swarna"
									name="name"
								/>
								<label className="label text-primary font-medium text-[14px]">
									Email
								</label>
								<input
									type="email"
									className="input outline-none border border-[#E9E9E9] rounded w-full py-2 pl-3 shadow-0 text-primary opacity-[0.5]"
									placeholder="smsowkothasan@gmail.com"
									name="email"
								/>
								<label className="label text-primary font-medium text-[14px]">
									Image-URL
								</label>
								<input
									type="text"
									className="input outline-none border border-[#E9E9E9] rounded w-full py-2 pl-3 shadow-0 text-primary opacity-[0.5]"
									placeholder="Photo URL here"
									name="photo"
								/>
								<label className="label text-primary font-medium text-[14px]">
									Password
								</label>
								<div className="relative">
									<input
										type={show ? "text" : "password"}
										className="input outline-none border border-[#E9E9E9] rounded w-full py-2 pl-3 shadow-0 text-primary opacity-[0.5]"
										placeholder="*************"
										name="password"
									/>
									<div className="absolute right-3 top-[50%] translate-y-[-50%] z-20">
										{show ? (
											<IoMdEyeOff
												onClick={() => setShow(!show)}
												className="text-[22px] cursor-pointer"
											/>
										) : (
											<IoMdEye
												onClick={() => setShow(!show)}
												className="text-[22px] cursor-pointer"
											/>
										)}
									</div>
								</div>
								<button className="btn h-12 bg-[linear-gradient(80deg,#632EE3_5.68%,#9F62F2_88.38%)] py-3 text-white text-[16px] font-semibold mt-4">
									Register
								</button>
							</fieldset>
						</form>
						<div className="divider">OR</div>
						{/* Social Login */}
						<SocialLogin />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
