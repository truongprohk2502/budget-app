import { FC } from "react";
import { IExpense } from "./AddExpenseForm";
import { formatCurrency, formatDateToLocaleString } from "../../helpers";

interface IProps {
  expenses: IExpense[];
}

const ExpenseTable: FC<IProps> = ({ expenses }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date"].map((i, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
