import { FC } from "react";
import { ActionFunction, useLoaderData } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import { delay, deleteItem, fetchData } from "../helpers";
import { IExpense } from "./Dashboard/AddExpenseForm";
import { toast } from "react-toastify";

interface ILoaderData {
  expenses: IExpense[];
}

export function expensesLoader() {
  const expenses = fetchData("expenses") ?? [];
  return { expenses };
}

export const expensesAction: ActionFunction = async ({ request }) => {
  await delay(500);
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "deleteExpense":
      try {
        deleteItem({
          key: "expenses",
          id: values.expenseId as string,
        });
        return toast.success("Expense deleted!");
      } catch (e) {
        throw new Error("There was a problem deleting your expense.");
      }
  }
};

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
