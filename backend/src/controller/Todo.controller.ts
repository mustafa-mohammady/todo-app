import type { Request, Response } from "express";
import tasksModel from "../models/Todo";

// Receive all task
export const allTodos = async (request: Request, response: Response) => {
  try {
    const tasks = await tasksModel.find();
    response.status(200).json(tasks);
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
  response.status(201).json(task);
};
