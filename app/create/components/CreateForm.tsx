"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
        console.log("submitted data:", data);
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
              placeholder="Login button not working on mobile"
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
                <SelectValue placeholder="Select" />
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

      <div className="flex gap-2">
        <label htmlFor="completed">Complete</label>
        <input type={"checkbox"} {...register("completed")} id="completed" />
      </div>
      <div className="flex gap-2 self-start">
        <Button
          variant={"secondary"}
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant={"default"}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
