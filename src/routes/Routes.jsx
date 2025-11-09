import { createBrowserRouter } from "react-router";
import Root from "../layOuts/RootLayout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import MyTransactions from "../pages/MyTransactions/MyTransactions";
import TransactionDetails from "../pages/TransactionDetails/TransactionDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: Root,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "login",
				Component: Login,
			},
			{
				path: "register",
				Component: Register,
			},
			{
				path: "addTransaction",
				element: (
					<PrivateRoutes>
						<AddTransaction />
					</PrivateRoutes>
				),
			},
			{
				path: "myTransactions",
				element: (
					<PrivateRoutes>
						<MyTransactions />
					</PrivateRoutes>
				),
			},
			{
				path: "transactionDetails/:id",
				loader: ({ params }) =>
					fetch(`http://localhost:5170/transactions/${params.id}`),
				element: (
					<PrivateRoutes>
						<TransactionDetails />
					</PrivateRoutes>
				),
			},
			{
				path: "profile",
				element: (
					<PrivateRoutes>
						<Profile />
					</PrivateRoutes>
				),
			},
		],
	},
]);
