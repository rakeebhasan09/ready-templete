import { Edit2, Eye, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const MyTransactions = () => {
	const { user } = useAuth();
	const [transactions, setTransactions] = useState([]);
	const axiosInstance = useAxios();

	// Get All of my transactions
	useEffect(() => {
		fetch(
			`https://fin-ease-server.vercel.app/transactions?email=${user.email}`
		)
			.then((res) => res.json())
			.then((data) => {
				setTransactions(data);
			});
	}, [user]);

	// Delete Transaction
	const handleDeleteTransaction = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: `You won't be able to revert this!`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosInstance.delete(`/transactions/${id}`).then((data) => {
					console.log(data.data);
					if (data.data.deletedCount) {
						const remaining = transactions.filter(
							(item) => item._id !== id
						);
						setTransactions(remaining);
						Swal.fire({
							title: "Deleted!",
							text: "Your file has been deleted.",
							icon: "success",
						});
					}
				});
			}
		});
	};

	return (
		<section className="py-10 md:py-14 lg:py-20 px-6">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold">My Transactions</h2>
				<p className="mb-8">View and manage all your transactions</p>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{transactions.map((t) => (
						<div
							key={t._id}
							className="rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
						>
							<div className="flex items-center gap-2 mb-2">
								<div
									className={`p-2 rounded-lg ${
										t.transaction_type === "income"
											? "bg-green-100 text-green-600"
											: "bg-red-100 text-red-500"
									}`}
								>
									{t.transaction_type === "income" ? (
										<TrendingUp size={20} />
									) : (
										<TrendingDown size={20} />
									)}
								</div>
								<span
									className={`text-xs font-medium px-2 py-0.5 rounded ${
										t.transaction_type === "income"
											? "bg-blue-100 text-blue-700"
											: "bg-red-100 text-red-600"
									}`}
								>
									{t.transaction_type}
								</span>
							</div>

							<h3 className="text-lg font-semibold capitalize">
								{t.transaction_category}
							</h3>
							<p
								className={`text-xl font-bold mt-2 ${
									t.transaction_type === "income"
										? "text-green-600"
										: "text-red-500"
								}`}
							>
								${t.transaction_amount}
							</p>
							<p className="text-sm mt-1">
								{new Date(
									t.transaction_date
								).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "short",
									year: "2-digit",
								})}
							</p>

							<div className="flex items-center gap-2 mt-4">
								{/* Transaction Details */}
								<Link
									to={`/transaction/${t._id}`}
									className="flex items-center gap-1 text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 transition"
								>
									<Eye size={14} /> Details
								</Link>
								{/* Edit Transaction */}
								<Link
									to={`/transaction/update/${t._id}`}
									className="p-2 rounded-lg border border-gray-200 transition"
								>
									<Edit2
										size={14}
										className="text-gray-600 dark:text-white"
									/>
								</Link>
								{/* Delete Transaction */}
								<button
									onClick={() =>
										handleDeleteTransaction(t._id)
									}
									className="p-2 rounded-lg cursor-pointer border border-gray-200 transition"
								>
									<Trash2
										size={14}
										className="text-red-500"
									/>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default MyTransactions;
