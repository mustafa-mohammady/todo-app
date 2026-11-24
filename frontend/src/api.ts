import { Todo } from "./types";

// The backend allows requests from http://localhost:5173 (CORS), so the frontend can call it directly.
export const API_URL = "http://localhost:3010/api/";
// Throws when the server answers with an error, so SWR puts it in `error` instead of `data`.
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not load the todos");
  }
  return response.json();
};

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

export const updateTodo = async (
  id: string,
  title: string,
  done: boolean,
): Promise<Todo> => {
  const response = await fetch(API_URL + "updateTodo/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, done }),
  });
  if (!response.ok) {
    throw new Error("Could not update the todo");
  }
  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(API_URL + "deleteTodo/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete the todo");
  }
  return response.json();
};
