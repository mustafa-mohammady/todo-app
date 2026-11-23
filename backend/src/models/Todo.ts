// Issue 2: write the mongoose schema, the model and `toTodo` here.
// Look at the Book model of Backend MongoDB: it has the same shape.
// A todo has a `title` (a required string, trimmed) and `done` (a boolean, default `false`).
// The types `Todo` and `NewTodo` are already in `../types.ts`.
import { HydratedDocument, model, Schema } from "mongoose";
import { NewTodo, Todo } from "../types";

const taskSchema = new Schema<NewTodo>({
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
});

const tasksModel = model<NewTodo>("tasks", taskSchema);

// 3. toTodo: converts one database todo into what the API sends (NEW, add this)
export const toTodo = (task: HydratedDocument<NewTodo>): Todo => ({
  id: task._id.toString(),
  title: task.title,
  done: task.done,
});

export default tasksModel;
