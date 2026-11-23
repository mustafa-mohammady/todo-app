import { Todo } from "./types";

// The backend allows requests from http://localhost:5173 (CORS), so the frontend can call it directly.
export const API_URL = "http://localhost:3010/api/";
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Put all functions that talk to the API here (fetcher for `useSWR`, create, update, delete),
// so that your components never call `fetch` themselves.

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch(API_URL + "createTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error("Could not create the todo");
  }
  return response.json();
};
