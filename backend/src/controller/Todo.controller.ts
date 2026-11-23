import type { Request, Response } from "express";
import tasksModel, { toTodo } from "../models/Todo";

// Receive all task
export const allTodos = async (request: Request, response: Response) => {
  try {
    const tasks = await tasksModel.find();
    response.status(200).json(tasks.map(toTodo));
  } catch {
    response.status(500).json({ error: "Problem Occured!" });
  }
};

// Create a task
export const createTodo = async (request: Request, response: Response) => {
  const task = await tasksModel.create({
    title: request.body.title,
    done: false,
  });
  response.status(201).json(toTodo(task));
};

// update a task
export const updateTodo = async (request: Request, response: Response) => {
  const id = request.params.id;
  const task = await tasksModel.findByIdAndUpdate(
    id,
    { title: request.body.title, done: request.body.done },
    { new: true, runValidators: true },
  );
  if (!task) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.status(200).json(toTodo(task));
};

// delete the task
export const deleteTodo = async (request: Request, response: Response) => {
  const id = request.params.id;
  const task = await tasksModel.findByIdAndDelete(id);
  if (!task) {
    response.status(404).json({ error: "Todo not found" });
    return;
  }
  response.status(200).json({ message: "successfully!" });
};
