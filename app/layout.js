"use client";

import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "@/components/Navigation";

import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Finance Tracker App</title>
				<meta
					name="description"
					content="Track your income and expenses effortlessly with our finance tracker app. Categorize spending, visualize your financial data with detailed charts, and manage your budget more effectively."
				/>
				<meta
					name="keywords"
					content="expense tracker, finance app, budgeting tools, income management, personal finance"
				/>
				<meta name="author" content="Roman Kudryashov" />
				<meta
					name="google-site-verification"
					content="6IFdr087Tj-ReSBlc3qYvQzTBVlC7Pnc3_-7Ss-_vTw"
				/>
			</head>
			<body>
				<AuthContextProvider>
					<FinanceContextProvider>
						<ToastContainer />
						<Nav />
						{children}
					</FinanceContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
