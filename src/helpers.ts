const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
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

export const delay = (time: number) =>
  new Promise((res) => setTimeout(res, time));
