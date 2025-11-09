import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";

const StatsCards = () => {
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
				<div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="text-gray-600 font-medium">
							Total Balance
						</h3>
						<div className="bg-blue-50 p-2 rounded-xl">
							<ArrowUpRight className="text-blue-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-blue-600 mt-3">
						$15,420.50
					</p>
				</div>

				{/* Total Income */}
				<div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="text-gray-600 font-medium">
							Total Income
						</h3>
						<div className="bg-green-50 p-2 rounded-xl">
							<TrendingUp className="text-green-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-green-600 mt-3">
						$25,000.00
					</p>
				</div>

				{/* Total Expenses */}
				<div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/3 border border-gray-200 ">
					<div className="flex justify-between items-start">
						<h3 className="text-gray-600 font-medium">
							Total Expenses
						</h3>
						<div className="bg-red-50 p-2 rounded-xl">
							<TrendingDown className="text-red-500" size={20} />
						</div>
					</div>

					<p className="text-3xl font-bold text-red-600 mt-3">
						$9,579.50
					</p>
				</div>
			</div>
		</div>
	);
};

export default StatsCards;
