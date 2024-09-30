"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import AddNewIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";

// Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
	const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
	const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);

	const [balance, setBalance] = useState(0);

	const { expenses, income } = useContext(financeContext);

	useEffect(() => {
		const incomeTotal = income.reduce((total, i) => {
			return total + i.amount;
		}, 0);

		const expensesTotal = expenses.reduce((total, e) => {
			return total + e.total;
		}, 0);
		const newBalance = incomeTotal - expensesTotal;
		setBalance(newBalance);
	}, [expenses, income]);

	return (
		<>
			{/* Add Income Modal */}
			<AddNewIncomeModal
				show={showAddIncomeModal}
				onClose={setShowAddIncomeModal}
			/>

			{/* Add Expenses Modal */}
			<AddExpensesModal
				show={showAddExpensesModal}
				onClose={setShowAddExpensesModal}
			/>

			<main className="container max-w-2xl px-6 mx-auto">
				{/* Account Balance */}
				<section className="py-3">
					<small className="text-gray-400 text-md">My Balance</small>
					<h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
				</section>

				{/* Add Expenses & Add Income buttons */}
				<section className="flex items-center gap-2 py-3">
					<button
						onClick={() => {
							setShowAddExpensesModal(true);
						}}
						className="btn btn-primary"
					>
						+ Expenses
					</button>
					<button
						onClick={() => setShowAddIncomeModal(true)}
						className="btn btn-primary-outline"
					>
						+ Income
					</button>
				</section>

				{/* Expenses */}
				<section className="py-6">
					<h3 className="text-2xl">My Expenses</h3>
					<div className="flex flex-col gap-4 mt-6">
						{expenses.map((expense) => {
							return (
								<ExpenseCategoryItem
									key={expense.id}
									expense={expense}
								/>
							);
						})}
					</div>
				</section>

				{/* Chart section */}
				<section className="py-6">
					<h3 className="text-2xl">Stats</h3>
					<div className="w-1/2 mx-auto">
						<Doughnut
							data={{
								labels: expenses.map((expense) => expense.title),
								datasets: [
									{
										label: "Expenses",
										data: expenses.map((expense) => expense.total),
										backgroundColor: expenses.map((expense) => expense.color),
										borderColor: ["#18181b"],
										borderWidth: 5,
									},
								],
							}}
						/>
					</div>
				</section>
			</main>
		</>
	);
}
