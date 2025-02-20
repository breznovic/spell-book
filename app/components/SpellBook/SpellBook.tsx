"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spell } from "@/app/utils/types";
import SpellCard from "../SpellCard/SpellCard";
import s from "./SpellBook.module.css";
import Loader from "../Loader/Loader";

const SpellBook = () => {
  const [spells, setSpells] = useState<Spell[]>([]);

  const fetchSpells = async () => {
    const response = await axios.get("http://localhost:8001/spells/");
    setSpells(response.data);
  };

  useEffect(() => {
    fetchSpells();
  }, []);

  if (!spells) {
    return <Loader />;
  }

  const handleDeleteSpell = (id: number) => {
    setSpells(spells.filter((spell) => spell.id !== id));
  };

  return (
    <div className={s.spellsContainer}>
      {spells.map((spell: Spell) => (
        <div className={s.spell} key={spell.id}>
          <SpellCard spell={spell} onDelete={handleDeleteSpell} />
        </div>
      ))}
    </div>
  );
};

export default SpellBook;
