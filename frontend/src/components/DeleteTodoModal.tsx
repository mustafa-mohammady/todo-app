import { deleteTodo } from "../api";
import type { Todo } from "../types";
import {
  BTN,
  BTN_SECONDARY,
  MODAL_ACTIONS,
  MODAL_BACKDROP,
  MODAL_PANEL,
  MODAL_TITLE,
  MODAL_WRAPPER,
} from "../classes";

type DeleteTodoModalProps = {
  todo: Todo;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeleteTodoModal({
  todo,
  open,
  onClose,
  onDeleted,
}: DeleteTodoModalProps) {
  const handleDelete = async () => {
    const toDo_id = todo.id;
    await deleteTodo(toDo_id);
    onDeleted();
    onClose();
  };
  if (!open) {
    return null;
  }

  return (
    <div className={MODAL_WRAPPER}>
      {/* Backdrop */}
      <div aria-hidden="true" onClick={onClose} className={MODAL_BACKDROP} />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-todo-heading"
        aria-describedby="delete-todo-text"
        className={MODAL_PANEL}
      >
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 id="delete-todo-heading" className={MODAL_TITLE}>
              Delete todo?
            </h2>
            <p id="delete-todo-text" className="mt-1 text-sm text-slate-500">
              <span className="font-medium break-words text-slate-700">
                “{todo.title}”
              </span>{" "}
              will be deleted. This can’t be undone.
            </p>
          </div>
        </div>

        <div className={`mt-6 ${MODAL_ACTIONS}`}>
          <button type="button" onClick={onClose} className={BTN_SECONDARY}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`${BTN} bg-red-600 hover:bg-red-700 focus-visible:outline-red-600`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
