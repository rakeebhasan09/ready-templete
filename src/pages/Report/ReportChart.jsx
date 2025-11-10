import { useEffect, useState } from "react";
import axios from "axios";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";

const ReportChart = () => {
	const [chartData, setChartData] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		axios
			.get(
				`https://fin-ease-server.vercel.app/report-data?email=${user?.email}`
			)
			.then((res) => {
				const data = res.data;
				const grouped = {};

				data.forEach((item) => {
					const date = new Date(item.transaction_date);
					const month = date.toLocaleString("en-US", {
						month: "long",
					});
					const amount = Number(item.transaction_amount);

					if (!grouped[month]) {
						grouped[month] = { month, income: 0, expense: 0 };
					}

					if (item.transaction_type === "income") {
						grouped[month].income += amount;
					} else if (item.transaction_type === "expense") {
						grouped[month].expense += amount;
					}
				});

				const monthOrder = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];

				const formatted = Object.values(grouped).sort(
					(a, b) =>
						monthOrder.indexOf(a.month) -
						monthOrder.indexOf(b.month)
				);

				setChartData(formatted);
			})
			.catch((err) => console.error(err));
	}, [user]);

	return (
		<div className="w-full h-[450px] rounded-2xl">
			<h2 className="text-2xl font-semibold mb-5 text-center">
				Monthly Income vs Expense
			</h2>

			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend
						payload={[
							{
								value: "Income",
								type: "square",
								color: "#34d399",
							},
							{
								value: "Expense",
								type: "square",
								color: "#f87171",
							},
						]}
					/>

					<Bar
						dataKey="income"
						fill="#34d399"
						name="Income"
						radius={[6, 6, 0, 0]}
					/>
					<Bar
						dataKey="expense"
						fill="#f87171"
						name="Expense"
						radius={[6, 6, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ReportChart;
