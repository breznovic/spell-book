import React from "react";
import Link from "next/link";
import s from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="/">
          <Image src={logo} alt="Logo" width={70} height={70} />
        </Link>
        <h1 className={s.title}>Spell Book</h1>
      </div>
    </header>
  );
};

export default Header;
