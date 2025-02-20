"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader/Loader";
import EditForm from "@/app/components/EditForm/EditForm";
import Modal from "@/app/components/Modal/Modal";

type FormValues = {
  name: string;
  description: string;
  level: string;
  school: string;
  imageUrl?: File | null;
};

const EditSpell = () => {
  const { id } = useParams();
  const router = useRouter();
  const [spell, setSpell] = useState<FormValues | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError: setFormError,
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/spells/${id}`);
        setSpell(response.data);
        reset(response.data);
      } catch (err) {
        console.error("Failed to fetch spell:", err);
      }
    };

    fetchSpell();
  }, [id, reset]);

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

      const response = await axios.put(
        `http://localhost:8001/spells/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setModalMessage(`Spell updated: ${response.data.name}`);
      setModalOpen(true);
    } catch (err) {
      setFormError("root", {
        type: "manual",
        message: "Error updating spell. Please try again.",
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

  if (!spell) {
    return <Loader />;
  }

  const handleModalClose = () => {
    setModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <EditForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        defaultValues={spell}
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

export default EditSpell;
