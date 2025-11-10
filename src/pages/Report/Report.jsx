import CategoryChart from "./CategoryChart";
import ReportChart from "./ReportChart";

const Report = () => {
	return (
		<section className="py-20 md:py-32 lg:py-40">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
					<div>
						<CategoryChart />
					</div>
					<div>
						<ReportChart />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Report;
