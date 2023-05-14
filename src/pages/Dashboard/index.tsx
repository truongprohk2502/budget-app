import { FC } from "react";
import { toast } from "react-toastify";
import {
  useLoaderData,
  ActionFunction,
  LoaderFunction,
  Link,
} from "react-router-dom";
import Intro from "./Intro";
import AddBudgetForm, { IBudget } from "./AddBudgetForm";
import {
  createBudget,
  createExpense,
  delay,
  deleteItem,
  fetchData,
} from "../../helpers";
import AddExpenseForm, { IExpense } from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import ExpenseTable from "../../components/ExpenseTable";

export interface ILoaderData {
  userName: string | null;
  budgets: IBudget[];
  expenses: IExpense[];
}

export const dashboardLoader: LoaderFunction = () => {
  const userName = localStorage.getItem("userName");
  const budgets = fetchData("budgets") ?? [];
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};

export const dashboardAction: ActionFunction = async ({ request }) => {
  await delay(500);
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "newUser":
      try {
        localStorage.setItem("userName", values.userName as string);
        return toast.success(`Welcome, ${values.userName}`);
      } catch (err) {
        throw new Error("There was a problem creating your account.");
      }
    case "createBudget":
      try {
        createBudget({
          name: values.newBudget as string,
          amount: +values.newBudgetAmount,
        });
        return toast.success("Budget created!");
      } catch (e) {
        throw new Error("There was a problem creating your budget.");
      }
    case "createExpense":
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

const Dashboard: FC = () => {
  const { userName, budgets, expenses } = useLoaderData() as ILoaderData;

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <ExpenseTable
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                    {expenses.length > 8 && (
                      <Link to="/expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
