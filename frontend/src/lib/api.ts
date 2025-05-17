import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { type CreateExpense } from "@server/sharedTypes";

const url = "/";

// Custom fetch function to include credentials
const customFetch = ((input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, { ...init, credentials: "include" });
}) as typeof fetch;

const client = hc<ApiRoutes>(`${url}`, { fetch: customFetch });

export const api = client.api;

const getCurrentUser = async () => {
  const res = await api.me.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
};
const getAllExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
};

export const createExpense = async ({ value }: { value: CreateExpense }) => {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) throw new Error("Server Error");

  const newExpense = await res.json();

  return newExpense;
};

export const deleteExpense = async ({ id }: { id: number }) => {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) throw new Error("Server Error");
};

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});
