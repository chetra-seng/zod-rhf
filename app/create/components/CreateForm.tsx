"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Task, taskSchema } from "@/validations/task";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const CreateForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
  });

  return (
    <form
      className="flex flex-col gap-4 p-10"
      onSubmit={handleSubmit((data) => {
        console.log("submitted data:", data);
      })}
    >
      {/* <div className="flex flex-col">
        <div className="flex gap-2">
          <label htmlFor="title">Title:</label>
          <input
            {...register("title")}
            id="title"
            className="border border-gray-500 rounded"
          />
        </div>
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div> */}
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
              placeholder="Login button not working on mobile"
              autoComplete="off"
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          {...register("description")}
          id="description"
          className="border border-gray-500 rounded"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="priority">Priority</label>
        <select id="priority" {...register("priority")}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex gap-2">
        <label htmlFor="completed">Complete</label>
        <input type={"checkbox"} {...register("completed")} id="completed" />
      </div>
      <div className="flex gap-2 self-start">
        <button
          type="button"
          className="px-4 py-1 bg-gray-300 text-gray-800 rounded"
          onClick={() => reset()}
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500/80 text-white rounded hover:bg-blue-500 active:bg-blue-500"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
