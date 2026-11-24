import { useState } from "react";
import { Todo } from "./types";
import { API_URL, fetcher, updateTodo } from "./api";
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

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const searchText = search.trim().toLowerCase();
  const visibleTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText),
  );

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, todo.title, !todo.done);
    mutate();
  };

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
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {isLoading ? (
          <p className="px-4 py-12 text-center text-sm text-slate-500 sm:px-6">
            Loading todos…
          </p>
        ) : error ? (
          <p
            role="alert"
            className="px-4 py-12 text-center text-sm text-red-600 sm:px-6"
          >
            Could not load the todos. Is the backend running?
          </p>
        ) : todos.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-slate-500 sm:px-6">
            No todos yet. Add your first one above.
          </p>
        ) : visibleTodos.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm break-words text-slate-500 sm:px-6">
            No todos match “{search.trim()}”.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={() => setEditingTodo(todo)}
                onDelete={() => setDeletingTodo(todo)}
                onToggle={() => handleToggle(todo)}
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
