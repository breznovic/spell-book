"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditForm from "@/app/components/EditForm/EditForm";
import Modal from "@/app/components/Modal/Modal";

type FormValues = {
  name: string;
  description: string;
  level: string;
  school: string;
  imageUrl?: File | null;
};

const AddSpell = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError: setFormError,
  } = useForm<FormValues>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const levelNumber = parseInt(data.level);
      if (isNaN(levelNumber)) {
        setFormError("level", {
          type: "manual",
          message: "Level must be a number",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("level", levelNumber.toString());
      formData.append("school", data.school);
      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await axios.post(
        "http://localhost:8001/spells/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setModalMessage(`Spell added: ${response.data.name}`);
      setModalOpen(true);
      reset();
      setImageFile(null);
    } catch (err) {
      setFormError("root", {
        type: "manual",
        message: "Error adding spell. Please try again.",
      });
      console.error(err);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <EditForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
      />
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </>
  );
};

export default AddSpell;
