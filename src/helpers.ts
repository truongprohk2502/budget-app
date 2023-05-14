const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

interface IGetMatchingItem {
  category: string;
  key: string;
  value: string;
}

export const getAllMatchingItems = ({
  category,
  key,
  value,
}: IGetMatchingItem) => {
  const data: any[] = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

interface ICreateBudget {
  name: string;
  amount: number;
}

export const createBudget = ({ name, amount }: ICreateBudget) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

interface ICreateExpense {
  name: string;
  amount: number;
  budgetId: string;
}

export const createExpense = ({ name, amount, budgetId }: ICreateExpense) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const fetchData = (key: string) => {
  try {
    const valueStr = localStorage.getItem(key);
    return valueStr ? JSON.parse(valueStr) : null;
  } catch {
    return null;
  }
};

interface IDeleteItem {
  key: string;
  id: string;
}

export const deleteItem = ({ key, id }: IDeleteItem) => {
  const existingData = fetchData(key);
  if (id && Array.isArray(existingData)) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const delay = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export const calculateSpentByBudget = (budgetId: number) => {
  const expenses: any[] = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((total, expense) => {
    if (expense.budgetId !== budgetId) return total;

    return (total += expense.amount);
  }, 0);
  return budgetSpent;
};

export const formatDateToLocaleString = (epoch: string | number) =>
  new Date(epoch).toLocaleDateString();

export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
