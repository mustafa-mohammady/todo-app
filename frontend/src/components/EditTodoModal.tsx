import { updateTodo } from "../api";
import type { Todo } from "../types";
import { FormEvent, useState } from "react";
import {
  BTN,
  BTN_SECONDARY,
  ICON_BTN,
  INPUT,
  INPUT_ERROR,
  INPUT_NORMAL,
  MODAL_ACTIONS,
  MODAL_BACKDROP,
  MODAL_PANEL,
  MODAL_TITLE,
  MODAL_WRAPPER,
} from "../classes";

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
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  if (!open) {
    return null;
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const new_title = title.trim();
    const id = todo.id;
    if (new_title !== "") {
      await updateTodo(id, title, todo.done);
      onUpdated();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className={MODAL_WRAPPER}>
      {/* Backdrop */}
      <div aria-hidden="true" onClick={onClose} className={MODAL_BACKDROP} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-todo-heading"
        className={MODAL_PANEL}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="edit-todo-heading" className={MODAL_TITLE}>
            Edit todo
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`-m-2 ${ICON_BTN} text-slate-400 hover:bg-slate-100 hover:text-slate-700`}
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
              onChange={(e) => {
                setTitle(e.target.value);
                setError(e.target.value.trim() === "");
              }}
              value={title}
              className={`${INPUT} w-full px-3 ${
                error ? INPUT_ERROR : INPUT_NORMAL
              }`}
            />
          </div>

          <div className={MODAL_ACTIONS}>
            <button type="button" onClick={onClose} className={BTN_SECONDARY}>
              Cancel
            </button>
            <button
              type="submit"
              className={`${BTN} bg-orange-600 hover:bg-amber-700 focus-visible:outline-indigo-600`}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
