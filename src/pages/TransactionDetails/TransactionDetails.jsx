import { ArrowLeft, Calendar, Tag, FileText, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
const TransactionDetails = () => {
	const transaction = useLoaderData();
	const [allTransactions, setAllTransactions] = useState([]);
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		fetch(
			`https://fin-ease-server.vercel.app/transactions?email=${user.email}`
		)
			.then((res) => res.json())
			.then((data) => setAllTransactions(data));
	}, [user]);

	const dataByCategory = allTransactions.filter(
		(item) => item.transaction_category === transaction.transaction_category
	);

	const totalInCategory = dataByCategory.reduce((sum, item) => {
		const raw = item.transaction_amount;
		const num = Number(String(raw).replace(/,/g, ""));
		return sum + (Number.isFinite(num) ? num : 0);
	}, 0);

	return (
		<section className="py-10 md:py-14 lg:py-20 px-6">
			<div className="max-w-3xl mx-auto">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-sm hover:text-blue-600 mb-6"
				>
					<ArrowLeft size={16} />
					Back to Transactions
				</button>

				{/* Card */}
				<div className="bg-white dark:bg-[#1D232A] rounded-2xl shadow-sm border border-gray-100 p-8">
					<div className="flex justify-between items-start mb-6">
						<div className="flex items-center gap-2">
							<div
								className={`p-2 rounded-lg ${
									transaction.transaction_type === "income"
										? "bg-green-100 text-green-600"
										: "bg-red-100 text-red-500"
								}`}
							>
								<FileText size={20} />
							</div>
							<span
								className={`text-xs font-medium px-2 py-0.5 rounded ${
									transaction.transaction_type === "income"
										? "bg-blue-100 text-blue-700"
										: "bg-red-100 text-red-600"
								}`}
							>
								{transaction.transaction_type}
							</span>
						</div>

						<p
							className={`text-2xl font-bold ${
								transaction.transaction_type === "income"
									? "text-green-600"
									: "text-red-500"
							}`}
						>
							${transaction.transaction_amount}
						</p>
					</div>

					<h2 className="text-2xl font-semibold mb-6 capitalize">
						{transaction.transaction_category}
					</h2>

					<hr className="border-gray-200 mb-6" />

					{/* Details */}
					<div className="grid sm:grid-cols-2 gap-6 mb-6 text-sm">
						<div className="flex items-start gap-2">
							<Calendar
								size={18}
								className="text-gray-400 mt-0.5"
							/>
							<div>
								<p>Date</p>
								<p className="font-medium">
									{new Date(
										transaction.transaction_date
									).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "2-digit",
									})}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Tag size={18} className="text-gray-400 mt-0.5" />
							<div>
								<p>Category</p>
								<p className="font-medium capitalize">
									{transaction.transaction_category}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<DollarSign
								size={18}
								className="text-gray-400 mt-0.5"
							/>
							<div>
								<p>Total in Category</p>
								<p className="font-medium">{totalInCategory}</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<FileText
								size={18}
								className="text-gray-400 mt-0.5"
							/>
							<div>
								<p>Transaction ID</p>
								<p className="font-medium">
									#{transaction._id}
								</p>
							</div>
						</div>
					</div>

					<hr className="border-gray-200 mb-6" />

					{/* Description */}
					<div className="mb-6">
						<p className="text-sm mb-1">Description</p>
						<p>{transaction.description}</p>
					</div>

					<hr className="border-gray-200 mb-6" />

					{/* Created By */}
					<div className="bg-gray-50 dark:bg-[#1D232A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
						<div>
							<p>Created By</p>
							<p className="font-medium">
								{transaction.transaction_by}
							</p>
						</div>
						<div>
							<p>Email</p>
							<p className="font-medium">{transaction.email}</p>
						</div>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 mt-6">
						<button
							onClick={() => navigate(-1)}
							className="border common-btn cursor-pointer text-white border-gray-200 hover:bg-gray-100 font-medium px-4 py-2.5 rounded-lg transition"
						>
							View All
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TransactionDetails;
