import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/app';

const url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const client = hc<ApiRoutes>(`${url}`);

export const api = client.api;
