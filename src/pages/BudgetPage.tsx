import { FC } from "react";
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import ExpenseTable from "../components/ExpenseTable";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import { IBudget } from "./Dashboard/AddBudgetForm";
import { IExpense } from "../components/AddExpenseForm";

interface ILoaderData {
  budget: IBudget;
  expenses: IExpense[];
}

export const budgetLoader: LoaderFunction = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id as string,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id as string,
  });

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }

  return { budget, expenses };
};

export const budgetAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense as string,
        amount: +values.newExpenseAmount,
        budgetId: values.newExpenseBudget as string,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
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

const BudgetPage: FC = () => {
  const { budget, expenses } = useLoaderData() as ILoaderData;

  return (
    <div
      className="grid-lg"
      style={{
        // @ts-ignore
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <ExpenseTable expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
