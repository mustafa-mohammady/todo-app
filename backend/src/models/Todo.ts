// Issue 2: write the mongoose schema, the model and `toTodo` here.
// Look at the Book model of Backend MongoDB: it has the same shape.
// A todo has a `title` (a required string, trimmed) and `done` (a boolean, default `false`).
// The types `Todo` and `NewTodo` are already in `../types.ts`.
import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  id: String,
  title: String,
  done: Boolean,
});

const tasksModel = model("tasks", taskSchema);

export default tasksModel;
