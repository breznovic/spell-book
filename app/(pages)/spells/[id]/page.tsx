"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import { Spell } from "@/app/utils/types";

type SpellDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

const SpellDescription = ({ params }: SpellDetailProps) => {
  const { id } = use(params);
  const [spell, setSpell] = useState<Spell | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSpellDetails = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/spells/${id}`
          );
          setSpell(response.data);
        } catch (error) {
          console.error("Error fetching spell details:", error);
        }
      };

      fetchSpellDetails();
    }
  }, [id]);

  if (!spell) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{spell.name}</h1>
      <p>{spell.description}</p>
      <p>Level: {spell.level}</p>
      <p>School: {spell.school}</p>
    </div>
  );
};

export default SpellDescription;
