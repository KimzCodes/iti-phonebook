import styles from "./styles.module.css";

const { box, deleteBtn } = styles;

const User = ({ id, name, age, gender, deleteUser, selectedUser }) => {
  const deleteHandler = (e) => {
    e.stopPropagation();
    deleteUser(id);
  };
  return (
    <div
      className={box}
      onClick={() => selectedUser({ id, name, gender, age })}
    >
      <ul>
        <li>name: {name}</li>
        <li>gender: {gender}</li>
        <li>age: {age}</li>
      </ul>
      <div className={deleteBtn} onClick={deleteHandler}>
        x
      </div>
    </div>
  );
};

export default User;
