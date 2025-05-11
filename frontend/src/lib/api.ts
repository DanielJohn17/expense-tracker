import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/app';

const url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const client = hc<ApiRoutes>(`${url}`);
// Custom fetch function to include credentials
const customFetch = ((input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, { ...init, credentials: "include" });
}) as typeof fetch;

const client = hc<ApiRoutes>(`${url}`, { fetch: customFetch });

export const api = client.api;
