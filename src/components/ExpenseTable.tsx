import { FC } from "react";
import { IExpense } from "../pages/Dashboard/AddExpenseForm";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

interface IProps {
  expenses: IExpense[];
}

const ExpenseTable: FC<IProps> = ({ expenses }) => {
  const fetcher = useFetcher();

  const getBudget = (budgetId: string) => {
    return getAllMatchingItems({
      category: "budgets",
      key: "id",
      value: budgetId,
    })[0];
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", "Budget"].map((i, index) => (
              <th key={index}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>{formatDateToLocaleString(expense.createdAt)}</td>
              <td>
                <Link
                  to={`/budget/${expense.budgetId}`}
                  style={{
                    // @ts-ignore
                    "--accent": getBudget(expense.budgetId).color,
                  }}
                >
                  {getBudget(expense.budgetId).name}
                </Link>
              </td>
              <td>
                <fetcher.Form method="post">
                  <input type="hidden" name="_action" value="deleteExpense" />
                  <input type="hidden" name="expenseId" value={expense.id} />
                  <button
                    type="submit"
                    className="btn btn--warning"
                    aria-label={`Delete ${expense.name} expense`}
                  >
                    <TrashIcon width={20} />
                  </button>
                </fetcher.Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
