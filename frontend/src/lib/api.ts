import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
