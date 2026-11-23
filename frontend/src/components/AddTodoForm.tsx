import { FormEvent } from "react";
import { createTodo } from "../api";

type AddTodoFormProps = {
  onAdded: () => void;
};

export default function AddTodoForm({ onAdded }: AddTodoFormProps) {
  const addNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEelement = e.currentTarget;
    const formData = new FormData(formEelement);
    const title = String(formData.get("title")).trim();

    if (title !== "") {
      await createTodo(title);
      formEelement.reset();
      onAdded();
    }
  };
  return (
    <form className="flex gap-2" onSubmit={addNewTodo}>
      <label htmlFor="new-todo" className="sr-only">
        New todo
      </label>
      <input
        id="new-todo"
        name="title"
        type="text"
        placeholder="What needs to be done?"
        className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <button
        type="submit"
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        Add
      </button>
    </form>
  );
}
