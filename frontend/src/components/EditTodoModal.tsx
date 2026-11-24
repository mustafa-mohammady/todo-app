import { updateTodo } from "../api";
import type { Todo } from "../types";
import { FormEvent } from "react";

type EditTodoModalProps = {
  todo: Todo;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditTodoModal({
  todo,
  open,
  onClose,
  onUpdated,
}: EditTodoModalProps) {
  if (!open) {
    return null;
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEelement = e.currentTarget;
    const formData = new FormData(formEelement);
    const title = String(formData.get("title")).trim();
    const id = todo.id;
    if (title !== "") {
      // Done is changed with the button on the row, so keep its current value here.
      await updateTodo(id, title, todo.done);
      onUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-todo-heading"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="edit-todo-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Edit todo
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 inline-flex size-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <form className="mt-5 space-y-5" onSubmit={handleUpdate}>
          <div>
            <label
              htmlFor="edit-title"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              defaultValue={todo.title}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg px-4 text-sm font-medium cursor-pointer text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white transition-colors cursor-pointer hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
