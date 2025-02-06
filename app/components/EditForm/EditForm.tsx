"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import s from "./EditForm.module.css";
import Button from "@/app/components/Button/Button";

type FormValues = {
  name: string;
  description: string;
  level: string;
  school: string;
  imageUrl?: File | null;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
  defaultValues?: FormValues;
  errors: {
    name?: { message?: string };
    description?: { message?: string };
    level?: { message?: string };
    school?: { message?: string };
    root?: { message?: string };
  };
  register: ReturnType<typeof useForm<FormValues>>["register"];
  handleSubmit: ReturnType<typeof useForm<FormValues>>["handleSubmit"];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditForm: React.FC<Props> = ({
  onSubmit,
  isSubmitting,
  defaultValues,
  errors,
  register,
  handleSubmit,
  handleImageUpload,
}) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        {defaultValues ? "Edit Spell" : "Add Your Spell"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <input
          type="text"
          placeholder="Spell Name"
          {...register("name", {
            required: "Spell name is required",
            maxLength: {
              value: 25,
              message: "Spell name cannot exceed 25 characters",
            },
            minLength: {
              value: 3,
              message: "Spell name must be at least 3 characters",
            },
          })}
          className={s.input}
          defaultValue={defaultValues?.name}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 150,
              message: "Description cannot exceed 150 characters",
            },
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className={s.textarea}
          defaultValue={defaultValues?.description}
        />
        {errors.description && (
          <p className={s.error}>{errors.description.message}</p>
        )}

        <input
          type="number"
          placeholder="Level"
          {...register("level", {
            required: "Level is required",
            min: {
              value: 1,
              message: "Level must be at least 1",
            },
            max: {
              value: 5,
              message: "Level must be at most 5",
            },
          })}
          className={s.input}
          defaultValue={defaultValues?.level}
        />
        {errors.level && <p className={s.error}>{errors.level.message}</p>}

        <input
          type="text"
          placeholder="School"
          {...register("school", {
            required: "School is required",
            maxLength: {
              value: 15,
              message: "School name cannot exceed 15 characters",
            },
            minLength: {
              value: 3,
              message: "School name must be at least 3 characters",
            },
          })}
          className={s.input}
          defaultValue={defaultValues?.school}
        />
        {errors.school && <p className={s.error}>{errors.school.message}</p>}

        <p className={s.label}>Upload an image (optional)</p>
        <input
          type="file"
          accept="image/*"
          className={s.fileInput}
          onChange={handleImageUpload}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          title={
            isSubmitting
              ? defaultValues
                ? "Updating..."
                : "Adding..."
              : defaultValues
              ? "Update Spell"
              : "Add Spell"
          }
        />
        {errors.root && <p className={s.error}>{errors.root.message}</p>}
      </form>
    </div>
  );
};

export default EditForm;
