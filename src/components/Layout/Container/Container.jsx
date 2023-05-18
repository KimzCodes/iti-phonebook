import styles from "./styles.module.css";

const Container = ({ children, style, className, variant }) => {
  return (
    <div
      className={`${styles.container} ${className} ${styles[variant]}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
