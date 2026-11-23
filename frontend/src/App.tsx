import { useEffect, useState } from "react";
import { Todo } from "./types";
import { API_URL, fetcher } from "./api";
import AddTodoForm from "./components/AddTodoForm";
import SearchBar from "./components/SearchBar";
import TodoItem from "./components/TodoItem";
import useSWR from "swr";

export default function App() {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    `${API_URL + "todos"}`,
    fetcher,
  );

  const todos = data ?? [];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <header className="flex items-baseline justify-between gap-4 px-4 pt-6 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Todos
          </h1>
          <p className="text-sm text-slate-500">
            {todos.filter((todo) => todo.done).length} of {todos.length} done
          </p>
        </header>

        <div className="space-y-3 border-b border-slate-200 px-4 py-5 sm:px-6">
          <AddTodoForm onAdded={() => mutate()} />
          <SearchBar />
        </div>

        {todos.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-slate-500 sm:px-6">
            No todos yet. Add your first one above.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
