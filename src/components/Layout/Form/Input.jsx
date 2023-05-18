import { forwardRef, useImperativeHandle, useRef } from "react";

import styles from "./styles.module.css";

const Input = ({ type = "text", ...rest }, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => {
          inputRef.current.focus();
        },
      };
    },
    []
  );

  return (
    <input
      type={type}
      {...rest}
      className={styles["form-input"]}
      ref={inputRef}
    />
  );
};

export default forwardRef(Input);
