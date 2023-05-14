import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import { fetchData } from "../helpers";
import { IExpense } from "./Dashboard/AddExpenseForm";

interface ILoaderData {
  expenses: IExpense[];
}

export function expensesLoader() {
  const expenses = fetchData("expenses") ?? [];
  return { expenses };
}

const ExpensesPage: FC = () => {
  const { expenses } = useLoaderData() as ILoaderData;

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <ExpenseTable expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
