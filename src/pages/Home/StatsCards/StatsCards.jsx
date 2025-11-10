import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const StatsCards = () => {
	const { user } = useAuth();
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetch(
			`https://fin-ease-server.vercel.app/transactions?email=${user?.email}`
		)
			.then((res) => res.json())
			.then((data) => setTransactions(data));
	}, [user]);

	// Total Income
	const incomeData = transactions.filter(
		(item) => item.transaction_type === "income"
	);
	const totalIncome = incomeData.reduce((sum, item) => {
		const raw = item.transaction_amount;
		const num = Number(String(raw).replace(/,/g, ""));
		return sum + (Number.isFinite(num) ? num : 0);
	}, 0);

	// Total Expense
	const expenseData = transactions.filter(
		(item) => item.transaction_type === "expense"
	);
	const totalExpense = expenseData.reduce((sum, item) => {
		const raw = item.transaction_amount;
		const num = Number(String(raw).replace(/,/g, ""));
		return sum + (Number.isFinite(num) ? num : 0);
	}, 0);

	// Overall Total
	let myTotal = totalIncome - totalExpense;

	return (
		<div className="py-10 md:py-14 lg:py-20">
			<div className="text-center">
				{/* Heading */}
				<span className="text-3xl md:text-4xl font-bold text-primary">
					FinEase Status
				</span>
			</div>
			<div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
				{/* Total Balance */}
				<div className="rounded-2xl bg-white dark:bg-[#1D232A] shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="font-medium">Total Balance</h3>
						<div className="bg-blue-50 p-2 rounded-xl">
							<ArrowUpRight className="text-blue-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-blue-600 mt-3">
						${myTotal ? myTotal : "0"}
					</p>
				</div>

				{/* Total Income */}
				<div className="rounded-2xl bg-white dark:bg-[#1D232A] shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="font-medium">Total Income</h3>
						<div className="bg-green-50 p-2 rounded-xl">
							<TrendingUp className="text-green-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-green-600 mt-3">
						${totalIncome}
					</p>
				</div>

				{/* Total Expenses */}
				<div className="rounded-2xl bg-white dark:bg-[#1D232A] shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="font-medium">Total Expenses</h3>
						<div className="bg-red-50 p-2 rounded-xl">
							<TrendingDown className="text-red-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-red-600 mt-3">
						${totalExpense}
					</p>
				</div>
			</div>
		</div>
	);
};

export default StatsCards;
