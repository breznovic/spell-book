import { Spell } from "@/app/utils/types";
import s from "./SpellCard.module.css";
import Link from "next/link";
import { BsFeather } from "react-icons/bs";
import { FaBroom } from "react-icons/fa6";
import Modal from "../Modal/Modal";
import { useState } from "react";
import axios from "axios";

type SpellProps = {
  spell: Spell;
  onDelete: (id: number) => void;
};

const SpellCard: React.FC<SpellProps> = ({ spell, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    setModalMessage("Are you sure you want to delete this spell?");
    setModalOpen(true);
    setConfirmDelete(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    const response = await axios.delete(
      `http://localhost:8001/spells/${spell.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response) {
      throw new Error("Failed to delete the spell");
    }

    onDelete(spell.id);
    setModalOpen(false);
  };

  return (
    <>
      <div className={s.spell}>
        <div className={s.spellInfo}>
          <strong className={s.title}>{spell.name}</strong>
          <p className={s.level}>Level {spell.level}</p>
          <p>School: {spell.school}</p>
        </div>
        <div className={s.imageContainer}>
          <Link href={`/spells/${spell.id}`}>
            <img
              src={spell.image_url}
              alt={spell.name}
              width={80}
              height={80}
              className={s.image}
            />
          </Link>
          <div className={s.icons}>
            <Link href={`/spells/edit-spell/${spell.id}`}>
              <BsFeather className={s.icon} />
            </Link>
            <FaBroom className={s.icon} onClick={handleDelete} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        message={modalMessage}
        onConfirm={confirmDelete ? handleConfirmDelete : undefined}
      />
    </>
  );
};

export default SpellCard;
