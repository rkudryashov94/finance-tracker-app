"use client";

import "./globals.css";

import Nav from "@/components/Navigation";

import FinanceContextProvider from "@/lib/store/finance-context";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Finance Tracker App</title>
				<meta
					name="description"
					content="Easily track your income and expenses, and manage your finances effectively."
				/>
				<meta
					name="keywords"
					content={[
						"expense tracker",
						"budgeting",
						"personal finance",
						"expense management",
						"financial planning",
						"track expenses",
						"save money",
						"budgeting app",
						"income and expenses",
					]}
				/>
				<meta name="author" content="Roman Kudryashov" />
				<meta
					name="google-site-verification"
					content="6IFdr087Tj-ReSBlc3qYvQzTBVlC7Pnc3_-7Ss-_vTw"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body>
				<FinanceContextProvider>
					<Nav />
					{children}
				</FinanceContextProvider>
			</body>
		</html>
	);
}
