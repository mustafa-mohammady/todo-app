import { FormEvent } from "react";
import { createTodo } from "../api";
import { BTN, INPUT, INPUT_NORMAL } from "../classes";

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
        className={`${INPUT} ${INPUT_NORMAL} min-w-0 flex-1 px-3`}
      />
      <button
        type="submit"
        className={`${BTN} inline-flex shrink-0 items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-indigo-600`}
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
