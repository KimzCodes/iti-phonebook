import styles from "./styles.module.css";
const { button, reset, submit } = styles;

const Button = ({ type = "submit", children, onClick }) => {
  const buttonStyle = `${type === "submit" ? submit : reset}`;
  return (
    <button className={`${button} ${buttonStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
