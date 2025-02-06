import s from "./Button.module.css";

type Props = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button: React.FC<Props> = ({ title, onClick, disabled }: Props) => {
  return (
    <button className={s.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
