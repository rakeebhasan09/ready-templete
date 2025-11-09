import { Edit2, Eye, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const MyTransactions = () => {
	const { user } = useAuth();
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5170/transactions?email=${user.email}`)
			.then((res) => res.json())
			.then((data) => {
				setTransactions(data);
			});
	}, [user]);

	console.log(transactions);

	return (
		<section className="bg-linear-to-br from-gray-50 to-gray-100 py-10 md:py-14 lg:py-20 px-6">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-gray-900">
					My Transactions
				</h2>
				<p className="text-gray-500 mb-8">
					View and manage all your transactions
				</p>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{transactions.map((t) => (
						<div
							key={t._id}
							className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
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

							<h3 className="text-lg font-semibold text-gray-800 capitalize">
								{t.transaction_category}
							</h3>
							<p className="text-gray-500 text-sm capitalize">
								{t.description}
							</p>
							<p
								className={`text-xl font-bold mt-2 ${
									t.transaction_type === "income"
										? "text-green-600"
										: "text-red-500"
								}`}
							>
								${t.transaction_amount}
							</p>
							<p className="text-sm text-gray-400 mt-1">
								{t.transaction_date}
							</p>

							<div className="flex items-center gap-2 mt-4">
								<Link
									to={`/transactionDetails/${t._id}`}
									className="flex items-center gap-1 text-gray-600 text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition"
								>
									<Eye size={14} /> Details
								</Link>
								<button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
									<Edit2
										size={14}
										className="text-gray-600"
									/>
								</button>
								<button className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 transition">
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
