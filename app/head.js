export default function Head() {
	return (
		<>
			<title>Finance Tracker App</title>
			<meta
				name="description"
				content="Track your income and expenses effortlessly with our finance tracker app. Categorize spending, 
                visualize your financial data with detailed charts, and manage your budget more effectively. Perfect for 
                personal financial planning, budgeting, and saving."
			/>
			<meta
				name="keywords"
				content={[
					"expense tracker app",
					"finance tracker app",
					"income and expense tracker",
					"budgeting and saving tools",
					"track income and spending",
					"expense analytics app",
					"monthly spending tracker",
					"budgeting app",
					"visualize income and expenses",
					"financial planning",
					"personal finance",
					"expense management",
				].join(",")}
			/>
			<meta name="author" content="Roman Kudryashov" />
			<meta
				name="google-site-verification"
				content="6IFdr087Tj-ReSBlc3qYvQzTBVlC7Pnc3_-7Ss-_vTw"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</>
	);
}
