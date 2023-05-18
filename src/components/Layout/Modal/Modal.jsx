import Container from "../Container/Container";
import styles from "./styles.module.css";

const Modal = ({ children, show, closeHandler }) => {
  return (
    <>
      {show ? (
        <>
          <div className={styles.wrapper} onClick={closeHandler}></div>
          <Container
            style={{
              width: "400px",
              background: "white",
              position: "absolute",
              zIndex: "2",
              marginTop: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            variant="lightBox"
          >
            {children}
          </Container>
        </>
      ) : null}
    </>
  );
};

export default Modal;
