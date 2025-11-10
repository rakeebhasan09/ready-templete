import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";

const COLORS = ["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6"];

const CategoryChart = () => {
	const [data, setData] = useState([]);
	const [isMobile, setIsMobile] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 640);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`https://fin-ease-server.vercel.app/report-data?email=${user?.email}`
				);
				const transactions = res.data;

				const expenses = transactions.filter(
					(t) => t.transaction_type === "expense"
				);

				const categoryTotals = expenses.reduce((acc, curr) => {
					const category = curr.transaction_category;
					const amount = parseFloat(curr.transaction_amount) || 0;
					acc[category] = (acc[category] || 0) + amount;
					return acc;
				}, {});

				const formattedData = Object.entries(categoryTotals).map(
					([name, value]) => ({ name, value })
				);

				setData(formattedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [user]);

	return (
		<div className="rounded-2xl w-full max-w-2xl mx-auto">
			<h2 className="text-xl font-semibold mb-1 text-center sm:text-left">
				Expenses by Category
			</h2>
			<p className="text-sm mb-4 text-center sm:text-left">
				Distribution of spending across categories
			</p>

			<div className="w-full h-72 sm:h-80 md:h-96">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius="70%"
							isAnimationActive={true}
							labelLine={!isMobile}
							label={
								!isMobile
									? ({ name, percent }) =>
											`${name} ${(percent * 100).toFixed(
												0
											)}%`
									: false
							}
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend
							layout={isMobile ? "horizontal" : "vertical"}
							align={isMobile ? "center" : "left"}
							verticalAlign={isMobile ? "bottom" : "middle"}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default CategoryChart;
