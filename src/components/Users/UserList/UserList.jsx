import { memo } from "react";
import User from "../User/User";

const UserList = ({ users, deleteUser, filter, selectedUser }) => {
  console.log("extraa render");
  const namesHandler = users
    .filter((user) => user?.name?.includes(filter))
    .map((user) => (
      <User
        key={user.id}
        {...user}
        deleteUser={deleteUser}
        selectedUser={selectedUser}
      />
    ));

  return <div>{namesHandler}</div>;
};

export default memo(UserList);
