"use client";

import { createContext, useState, useEffect } from "react";

// Firebase
import { db } from "@/lib/firebase";
import {
	collection,
	addDoc,
	doc,
	getDocs,
	deleteDoc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";

export const financeContext = createContext({
	income: [],
	expenses: [],
	addIncomeItem: async () => {},
	removeIncomeItem: async () => {},
	addExpenseItem: async () => {},
	addCategory: async () => {},
});

export default function FinanceContextProvider({ children }) {
	const [income, setIncome] = useState([]);
	const [expenses, setExpenses] = useState([]);

	const addCategory = async (category) => {
		try {
			const collectionRef = collection(db, "expenses");

			const docSnap = await addDoc(collectionRef, {
				...category,
				items: [],
			});

			setExpenses((prevState) => {
				return [
					...prevState,
					{
						id: docSnap.id,
						items: [],
						...category,
					},
				];
			});
		} catch (error) {
			throw error;
		}
	};

	const addExpenseItem = async (expenseCategoryId, newExpense) => {
		const docRef = doc(db, "expenses", expenseCategoryId);

		try {
			await updateDoc(docRef, { ...newExpense });

			// Update State
			setExpenses((prevState) => {
				const updatedExpenses = [...prevState];

				const foundIndex = updatedExpenses.findIndex((expense) => {
					return expense.id === expenseCategoryId;
				});

				updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };

				return updatedExpenses;
			});
		} catch (error) {
			throw error;
		}
	};

	const addIncomeItem = async (newIncome) => {
		const collectionRef = collection(db, "income");

		try {
			const docSnap = await addDoc(collectionRef, newIncome);

			// Update state
			setIncome((prevState) => {
				return [
					...prevState,
					{
						id: docSnap.id,
						...newIncome,
					},
				];
			});
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	};

	const removeIncomeItem = async (incomeId) => {
		const docRef = doc(db, "income", incomeId);
		try {
			await deleteDoc(docRef);

			// Update State
			setIncome((prevState) => {
				return prevState.filter((i) => i.id !== incomeId);
			});
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	};

	const values = {
		income,
		expenses,
		addIncomeItem,
		removeIncomeItem,
		addExpenseItem,
		addCategory,
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

		const getExpensesData = async () => {
			const collectionRef = collection(db, "expenses");

			const docsSnap = await getDocs(collectionRef);

			const data = docsSnap.docs.map((d) => {
				return {
					id: d.id,
					...d.data(),
				};
			});
			setExpenses(data);
		};

		getIncomeData();
		getExpensesData();
	}, []);

	return (
		<financeContext.Provider value={values}>{children}</financeContext.Provider>
	);
}