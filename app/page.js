"use client";

import { useEffect, useRef, useState } from "react";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";

// Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Firebase
import { db } from "@/lib/firebase";
import {
	collection,
	addDoc,
	doc,
	getDocs,
	deleteDoc,
	Timestamp,
} from "firebase/firestore";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
	{
		id: 1,
		title: "Entertainment",
		color: "yellow",
		total: 500,
	},

	{
		id: 2,
		title: "Utilities",
		color: "blue",
		total: 400,
	},

	{
		id: 3,
		title: "Fuel",
		color: "red",
		total: 300,
	},

	{
		id: 4,
		title: "Movies",
		color: "green",
		total: 100,
	},

	{
		id: 5,
		title: "Holidays",
		color: "purple",
		total: 2000,
	},
];

export default function Home() {
	const [income, setIncome] = useState([]);

	const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
	const amountRef = useRef();
	const descriptionRef = useRef();

	// Handler Functions

	const addIncomeHandler = async (e) => {
		e.preventDefault();

		const newIncome = {
			amount: amountRef.current.value,
			description: descriptionRef.current.value,
			createdAt: new Date(),
		};

		const collectionRef = collection(db, "income");

		try {
			const docSnap = await addDoc(collectionRef, newIncome);

			// Update State
			setIncome((prevState) => {
				return [
					...prevState,
					{
						id: docSnap.id,
						...newIncome,
					},
				];
			});

			amountRef.current.value = "";
			descriptionRef.current.value = "";
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteIncomeEntryHandler = async (incomeId) => {
		const docRef = doc(db, "income", incomeId);

		try {
			await deleteDoc(docRef);

			// Update State
			setIncome((prevState) => {
				return prevState.filter((i) => i.id !== incomeId);
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		const getIncomeData = async () => {
			const collectionRef = collection(db, "income");

			const docsSnap = await getDocs(collectionRef);

			const data = docsSnap.docs.map((d) => {
				const docData = d.data();

				// Firebase timestamp is different from JS Date() object
				// Need to overwrite and convert
				// Need to convert to milliseconds (toMillis())

				// Check if createdAt exists and is a Firestore Timestamp
				const createdAt =
					docData.createdAt instanceof Timestamp
						? new Date(docData.createdAt.toMillis())
						: null; // Handle missing or invalid timestamps

				return {
					id: d.id,
					...docData,
					createdAt, // converted or null
				};
			});

			setIncome(data);
		};

		getIncomeData();
	}, []);

	return (
		<>
			{/* Add Income Modal */}
			<Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
				<form className="input-group" onSubmit={addIncomeHandler}>
					<div className="input-group">
						<label>Income Amount</label>
						<input
							name="amount"
							type="number"
							ref={amountRef}
							min={0.01}
							step={0.01}
							placeholder="Enter income amount"
							required
						/>
					</div>

					<div className="input-group capitalize">
						<label>Description</label>
						<input
							name="description"
							type="text"
							ref={descriptionRef}
							min={0.01}
							step={0.01}
							placeholder="Enter income adescription"
							required
						/>
					</div>

					<button className="btn btn-primary" type="submit">
						Add entry
					</button>
				</form>

				<div className="flex flex-col gap-4 mt-6">
					<h3 className="text-2xl font-bold">Income History</h3>

					{income.map((i) => {
						return (
							<div className="flex items-center justify-between" key={i.id}>
								<div>
									<p className="font-semibold capitalize">{i.description}</p>
									<small className="text-xs">
										{i.createdAt
											? i.createdAt.toISOString()
											: "No Timestamp available"}
									</small>
								</div>
								<p className="flex items-center gap-2">
									{currencyFormatter(i.amount)}
									<button
										onClick={() => {
											deleteIncomeEntryHandler(i.id);
										}}
									>
										<FaRegTrashAlt />
									</button>
								</p>
							</div>
						);
					})}
				</div>
			</Modal>

			<main className="container max-w-2xl px-6 mx-auto">
				{/* Account Balance */}
				<section className="py-3">
					<small className="text-gray-400 text-md">My Balance</small>
					<h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
				</section>

				{/* Add Expenses & Add Income buttons */}
				<section className="flex items-center gap-2 py-3">
					<button onClick={() => {}} className="btn btn-primary">
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
						{DUMMY_DATA.map((expense) => {
							return (
								<ExpenseCategoryItem
									key={expense.id}
									color={expense.color}
									title={expense.title}
									total={expense.total}
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
								labels: DUMMY_DATA.map((expense) => expense.title),
								datasets: [
									{
										label: "Expenses",
										data: DUMMY_DATA.map((expense) => expense.total),
										backgroundColor: DUMMY_DATA.map((expense) => expense.color),
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
