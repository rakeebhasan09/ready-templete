import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
	const { user, loggedOut } = use(AuthContext);
	// Handle Log Out
	const handleLogOut = () => {
		loggedOut()
			.then(() => {
				toast.success("Logged Out Successfully!");
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

	const links = (
		<>
			<li>
				<NavLink
					to="/"
					className="hover:bg-transparent p-0 text-[16px]"
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/addTransaction"
					className="hover:bg-transparent p-0 text-[16px]"
				>
					Add Transaction
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/myTransactions"
					className="hover:bg-transparent p-0 text-[16px]"
				>
					My Transactions
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					className="hover:bg-transparent p-0 text-[16px]"
				>
					Reports
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/profile"
					className="hover:bg-transparent p-0 text-[16px]"
				>
					Profile
				</NavLink>
			</li>
		</>
	);
	return (
		<header className="bg-[#FEFEFE] backdrop-blur supports-backdrop-filter:bg-[rgba(254,254,254,0.8)] py-5">
			<div className="container">
				<div className="navbar p-0 min-h-0">
					{/* Navbar Start */}
					<div className="navbar-start">
						<div className="dropdown z-50">
							<div
								tabIndex={0}
								role="button"
								className="lg:hidden cursor-pointer mr-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-10 w-10"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex="-1"
								className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-5 gap-4 shadow"
							>
								{links}
							</ul>
						</div>
						<Link to="/" className="text-xl font-semibold">
							<div
								className="flex items-center space-x-2"
								href="/"
							>
								<div className="rounded-lg bg-linear-to-br from-[#308CDF] to-[#2CBF97] p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#fff"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-wallet h-6 w-6 text-primary-foreground"
									>
										<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
										<path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
									</svg>
								</div>
								<span className="text-2xl font-bold text-primary">
									FinEase
								</span>
							</div>
						</Link>
					</div>
					{/* Menu Center */}
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal p-0 gap-8">
							{links}
						</ul>
					</div>
					{/* Menu End */}
					<div className="navbar-end">
						<input
							type="checkbox"
							value="synthwave"
							className="toggle theme-controller"
						/>
						<div className="flex items-center gap-3 ml-3">
							{user ? (
								<div className="dropdown dropdown-end w-[45px] h-[45px]">
									<div
										tabIndex={0}
										role="button"
										className="btn btn-ghost btn-circle avatar w-[45px] h-[45px]"
									>
										<div className="w-[45px] h-[45px] rounded-full">
											<img
												className="w-full"
												alt={user.displayName}
												src={user.photoURL}
											/>
										</div>
									</div>
									<ul
										tabIndex="-1"
										className="menu  z-50 menu-sm dropdown-content bg-white rounded-box mt-3 p-2 shadow"
									>
										<li>
											<a className="text-[16px]">
												{user.displayName}
											</a>
										</li>
										<li>
											<a className="text-[16px]">
												{user.email}
											</a>
										</li>
										<li>
											<a
												onClick={handleLogOut}
												className="text-[16px]"
											>
												Logout
											</a>
										</li>
									</ul>
								</div>
							) : (
								<>
									<Link
										to="/login"
										className="btn btn-outline btn-primary"
									>
										Login
									</Link>
									<Link
										to="/register"
										className="btn btn-primary hidden sm:flex items-center justify-center"
									>
										Register
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
