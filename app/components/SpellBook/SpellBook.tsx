"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spell } from "@/app/utils/types";

const SpellBook = () => {
  const [spells, setSpells] = useState([]);

  const fetchSpells = async () => {
    const response = await axios.get("http://127.0.0.1:8000/spells/");
    setSpells(response.data);
  };

  useEffect(() => {
    fetchSpells();
  }, []);

  return (
    <div>
      <h1>Spell Book</h1>
      <h2>Spells</h2>
      <ul>
        {spells.map((spell: Spell) => (
          <li key={spell.id}>
            {spell.name} (Level {spell.level}, School: {spell.school})<br />
            {spell.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpellBook;
