import { Hono } from 'hono';

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: 1, title: 'Groceries', amount: 50 },
  { id: 2, title: 'Rent', amount: 1200 },
  { id: 3, title: 'Utilities', amount: 200 },
  { id: 4, title: 'Internet', amount: 60 },
  { id: 5, title: 'Transportation', amount: 100 },
];

export const expensesRoute = new Hono()
  .get('/', async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post('/', async (c) => {
    const expenses = await c.req.json();
    console.log({ expenses });
    return c.json(expenses);
  });
