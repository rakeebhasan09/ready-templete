import { Plus, Calendar } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddTransaction = () => {
	const { user } = useAuth();
	const [type, setType] = useState("");
	const [category, setCategory] = useState("");
	const axiosInstance = useAxios();
	const navigate = useNavigate();
	const incomeCategories = [
		"Salary",
		"Freelance",
		"Investment",
		"Business",
		"Other Income",
	];
	const expenseCategories = [
		"Food",
		"Transport",
		"Shopping",
		"Bills",
		"Entertainment",
		"Healthcare",
		"Education",
		"Other",
	];

	// Handel Add Transaction
	const handleAddTransaction = (e) => {
		e.preventDefault();
		const transaction_type = type;
		const transaction_category = category;
		const transaction_amount = e.target.amount.value;
		const description = e.target.description.value;
		const transaction_date = e.target.date.value;
		const transaction_by = user.displayName;
		const email = user.email;

		const newTransactionData = {
			transaction_type,
			transaction_category,
			transaction_amount,
			description,
			transaction_date,
			transaction_by,
			email,
		};

		axiosInstance.post("/transactions", newTransactionData).then((data) => {
			if (data.data.insertedId) {
				e.target.reset();
				navigate("/myTransactions");
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Your Transaction has been saved",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};
	return (
		<div className="min-h-screen flex justify-center items-start py-10 px-4 bg-linear-to-br from-blue-50 to-green-50">
			<div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-8">
				{/* Header */}
				<div className="flex items-center gap-3 mb-6">
					<div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
						<Plus size={20} />
					</div>
					<div>
						<h2 className="text-2xl font-semibold text-gray-800">
							Add Transaction
						</h2>
						<p className="text-gray-500 text-sm">
							Record your income or expense
						</p>
					</div>
				</div>

				{/* Form */}
				<form onSubmit={handleAddTransaction} className="space-y-5">
					{/* Transaction Type */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Transaction Type{" "}
							<span className="text-red-500">*</span>
						</label>

						<select
							value={type}
							onChange={(e) => setType(e.target.value)}
							name="type"
							className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-400"
						>
							<option value="">Select type</option>
							<option value="income">Income</option>
							<option value="expense">Expense</option>
						</select>
					</div>

					{/* Category */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Category <span className="text-red-500">*</span>
						</label>

						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							name="category"
							className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-400"
						>
							<option value="">
								{type === ""
									? "Select type first"
									: "Select category"}
							</option>

							{type === "income" &&
								incomeCategories.map((cat) => (
									<option key={cat} value={cat.toLowerCase()}>
										{cat}
									</option>
								))}

							{type === "expense" &&
								expenseCategories.map((cat) => (
									<option key={cat} value={cat.toLowerCase()}>
										{cat}
									</option>
								))}
						</select>
					</div>

					{/* Amount */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Amount ($) <span className="text-red-500">*</span>
						</label>
						<input
							type="number"
							placeholder="0.00"
							name="amount"
							className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					{/* Description */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							placeholder="Add notes about this transaction..."
							rows="3"
							name="description"
							className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-400"
						></textarea>
					</div>

					{/* Date */}
					<div>
						<label className="text-sm font-medium text-gray-700">
							Date <span className="text-red-500">*</span>
						</label>

						<div className="flex items-center border border-gray-300 rounded-lg px-4 py-2.5 mt-1 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
							<Calendar
								className="text-gray-500 mr-2"
								size={18}
							/>
							<input
								type="date"
								name="date"
								className="w-full bg-transparent outline-none"
							/>
						</div>
					</div>

					{/* User Info Box */}
					<div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mt-4">
						<div>
							<p className="text-xs text-gray-500 font-medium">
								User Email
							</p>
							<p className="font-semibold text-gray-700">
								{user.email}
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 font-medium">
								User Name
							</p>
							<p className="font-semibold text-gray-700">
								{user.displayName}
							</p>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium mt-4"
					>
						<Plus size={18} />
						Add Transaction
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddTransaction;
