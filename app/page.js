"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
  );
}
