import s from "./Loader.module.css";
import Image from "next/image";
import loader from "../../assets/loader.gif";

const Loader = () => {
  return (
    <div className={s.loader}>
      <Image src={loader} alt="Loading book" width={75} height={75} />
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
