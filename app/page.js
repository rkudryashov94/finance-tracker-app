"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "yellow",
    amount: 500,
  },

  {
    id: 2,
    title: "Utilities",
    color: "blue",
    amount: 400,
  },

  {
    id: 3,
    title: "Fuel",
    color: "red",
    amount: 300,
  },

  {
    id: 4,
    title: "Movies",
    color: "green",
    amount: 100,
  },

  {
    id: 5,
    title: "Holidays",
    color: "brown",
    amount: 2000,
  },
];

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      {/* Account Balance */}
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      {/* Add Expenses & Add Income buttons */}
      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary-outline">+ Income</button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMMY_DATA.map((expense) => {
            return (
              <ExpenseCategoryItem
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
