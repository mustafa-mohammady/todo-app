import type { Todo } from "../types";
import { ICON_BTN } from "../classes";

type TodoItemProps = {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
};

export default function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggle,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 sm:px-6">
      <span
        className={`min-w-0 flex-1 break-words text-sm ${
          todo.done ? "text-slate-400 line-through" : "text-slate-800"
        }`}
      >
        {todo.title}
      </span>
      <div className="flex shrink-0 items-center gap-1">
        {/* Mark as done: green filled check when done, grey outline when not. */}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={todo.done}
          aria-label={
            todo.done
              ? `Mark "${todo.title}" as not done`
              : `Mark "${todo.title}" as done`
          }
          title={todo.done ? "Mark as not done" : "Mark as done"}
          className={`${ICON_BTN} ${
            todo.done
              ? "text-emerald-600 hover:bg-emerald-50"
              : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
          }`}
        >
          {todo.done ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <circle cx="10" cy="10" r="7.25" />
              <path d="m7 10.25 2 2 4-4.5" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit "${todo.title}"`}
          className={`${ICON_BTN} text-slate-400 hover:bg-slate-100 hover:text-slate-700`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete "${todo.title}"`}
          className={`${ICON_BTN} text-slate-400 hover:bg-red-50 hover:text-red-600`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
