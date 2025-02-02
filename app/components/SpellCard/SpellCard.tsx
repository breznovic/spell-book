import { Spell } from "@/app/utils/types";
import s from "./SpellCard.module.css";
import Image from "next/image";
import Link from "next/link";

type SpellProps = {
  spell: Spell;
};

const SpellCard: React.FC<SpellProps> = ({ spell }) => {
  return (
    <Link href={`/spells/${spell.id}`} className={s.spell}>
      <div>
        <strong className={s.title}>{spell.name}</strong> (Level {spell.level},
        School: {spell.school}
        )<br />
        <p className={s.description}>{spell.description}</p>
        <Image
          src={spell.image_url}
          alt={spell.name}
          width={50}
          height={50}
          className={s.image}
        />
      </div>
    </Link>
  );
};

export default SpellCard;
