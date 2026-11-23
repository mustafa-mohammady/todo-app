import { useEffect, useState } from "react";
import { Todo } from "./types";
import { API_URL, fetcher } from "./api";
import AddTodoForm from "./components/AddTodoForm";
import SearchBar from "./components/SearchBar";
import TodoItem from "./components/TodoItem";
import EditTodoModal from "./components/EditTodoModal";
import DeleteTodoModal from "./components/DeleteTodoModal";
import Toast from "./components/Toast";
import useSWR from "swr";

export default function App() {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    `${API_URL + "todos"}`,
    fetcher,
  );

  const todos = data ?? [];

  // The todo whose popup is open, or null when no popup is open.
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);

  // The text of the notification, or null when no notification is showing.
  const [notification, setNotification] = useState<string | null>(null);

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
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={() => setEditingTodo(todo)}
                onDelete={() => setDeletingTodo(todo)}
              />
            ))}
          </ul>
        )}
      </div>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          open={true}
          onClose={() => setEditingTodo(null)}
          onUpdated={() => mutate()}
        />
      )}
      {deletingTodo && (
        <DeleteTodoModal
          todo={deletingTodo}
          open={true}
          onDeleted={() => {
            mutate();
            setNotification(`"${deletingTodo.title}" was deleted`);
          }}
          onClose={() => setDeletingTodo(null)}
        />
      )}

      {notification && (
        <Toast message={notification} onClose={() => setNotification(null)} />
      )}
    </main>
  );
}
