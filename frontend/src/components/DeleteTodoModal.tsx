import type { Todo } from "../types";

type DeleteTodoModalProps = {
  todo: Todo;
  /** The modal only shows while this is true. */
  open: boolean;
  /** Runs for the Cancel button and a click on the dark backdrop. */
  onClose: () => void;
};

// Design only. TODO: add an onClick to the Delete button that calls deleteTodo(id).
export default function DeleteTodoModal({ todo, open, onClose }: DeleteTodoModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-todo-heading"
        aria-describedby="delete-todo-text"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200"
      >
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-red-600">
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 id="delete-todo-heading" className="text-lg font-semibold text-slate-900">
              Delete todo?
            </h2>
            <p id="delete-todo-text" className="mt-1 text-sm text-slate-500">
              <span className="font-medium break-words text-slate-700">“{todo.title}”</span> will be
              deleted. This can’t be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg px-4 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-10 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
