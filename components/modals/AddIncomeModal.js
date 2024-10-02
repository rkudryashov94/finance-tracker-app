import { useRef, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";

import Modal from "@/components/Modal";

import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { toast } from "react-toastify";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

function AddIncomeModal({ show, onClose }) {
	const amountRef = useRef();
	const descriptionRef = useRef();
	const { income, addIncomeItem, removeIncomeItem } =
		useContext(financeContext);

	const { user } = useContext(authContext);

	// Handler Functions
	const addIncomeHandler = async (e) => {
		e.preventDefault();

		const newIncome = {
			amount: +amountRef.current.value,
			description: descriptionRef.current.value,
			createdAt: new Date(),
			uid: user.uid,
		};

		try {
			await addIncomeItem(newIncome);
			amountRef.current.value = "";
			descriptionRef.current.value = "";

			toast.success("Income Added Successfully!");
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const deleteIncomeEntryHandler = async (incomeId) => {
		try {
			await removeIncomeItem(incomeId);
			toast.success("Income Deleted Successfully!");
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	return (
		<Modal show={show} onClose={onClose}>
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
	);
}

export default AddIncomeModal;
