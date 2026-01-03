import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(10, { message: "Title is too short" }),
  description: z.string().optional(),
  completed: z.boolean().default(false).optional(),
  priority: z.enum(["high", "medium", "low"]),
});

// Typescript only brader
export type Task = z.infer<typeof taskSchema>;
