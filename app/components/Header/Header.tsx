import React from "react";
import Link from "next/link";
import s from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import Button from "../Button/Button";

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={70}
              height={70}
              className={s.image}
            />
          </Link>
          <h1 className={s.title}>Spell Book</h1>
        </div>
        <Link href="/add-spell">
          <Button title="Add New Spell" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
