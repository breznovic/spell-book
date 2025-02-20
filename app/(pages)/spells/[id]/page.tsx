"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import { Spell } from "@/app/utils/types";
import s from "./page.module.css";
import Loader from "@/app/components/Loader/Loader";
import Button from "@/app/components/Button/Button";
import Link from "next/link";

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
            `http://localhost:8001/spells/${id}`
          );
          setSpell(response.data);
        } catch (error) {
          console.error("Error fetching spell details:", error);
        }
      };

      fetchSpellDetails();
    }
  }, [id]);

  console.log(spell);

  if (!spell) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>{spell.name}</h1>
      <div className={s.card}>
        <div className={s.info}>
          <p className={s.details}>Level: {spell.level}</p>
          <p className={s.details}>School: {spell.school}</p>
        </div>
        <img
          src={spell.image_url}
          alt={spell.name}
          className={s.image}
          width={300}
          height={300}
        />
        <p className={s.description}>{spell.description}</p>
      </div>
      <Link href="/">
        <Button title="Back to Spells" />
      </Link>
    </div>
  );
};

export default SpellDescription;
