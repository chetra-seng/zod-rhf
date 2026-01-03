"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task, taskSchema } from "@/validations/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const CreateForm: React.FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Task) => {
      const res = await fetch("http://localhost:3002/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    onSuccess: () => {},
  });

  const { control, handleSubmit, reset } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "high",
    },
  });

  return (
    <form
      className="flex flex-col gap-4 p-10"
      onSubmit={handleSubmit((data) => {
        console.log("data");
        mutate(data);
      })}
    >
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Title:</FieldLabel>
            <Input
              {...field}
              id="title"
              aria-invalid={fieldState.invalid}
              placeholder="Enter task title"
              autoComplete="off"
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Description:</FieldLabel>
            <Textarea
              placeholder="Enter task description"
              id="description"
              {...field}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name={"priority"}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="priority">Priority</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger aria-invalid={fieldState.invalid} id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="completed"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox
              id="completed"
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor="completed">Completed</FieldLabel>
          </Field>
        )}
      />
      <div className="flex gap-2 self-start">
        <Button variant={"secondary"} onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" variant={"default"} disabled={isPending}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
