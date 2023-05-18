import { useState, useRef, useEffect, useCallback } from "react";
import { Container, Modal, Button, Input, Loading } from "./components/Layout";
import { UserList, Form } from "./components/Users";
import useApi from "./hooks/use-api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState("");
  const filterInput = useRef(null);
  const userSelectedRef = useRef(null);
  const { loading, error, callAPI } = useApi();

  //complete forward ref and expose functions
  useEffect(() => {
    filterInput.current.focus();
    // load data from restFull api
    const loadUser = async () => {
      const response = await callAPI({
        method: "GET",
        url: "http://localhost:5005/users",
      });

      if (response.status === 200) {
        setUsers((prev) => [...prev, ...response.data]);
      }
    };

    loadUser();
  }, [callAPI]); //x1 ///2

  useEffect(() => {
    if (!show) {
      if (!userSelectedRef.current) {
        return;
      }
      userSelectedRef.current = null;
    }
  }, [show]);

  const saveUser = async (user) => {
    //x1
    const { crud, ...userInfo } = user;
    if (crud === "insert") {
      const response = await callAPI({
        method: "POST",
        url: "http://localhost:5005/users",
        data: userInfo,
      });

      if (response.status === 201) {
        setUsers((prev) => [...prev, userInfo]);
      }
    } else {
      const response = await callAPI({
        method: "PATCH",
        url: `http://localhost:5005/users/${userInfo.id}`,
        data: { name: "fara" },
      });
      if (response.status === 200) {
        setUsers(
          users.map((el) => {
            if (el.id === user.id) {
              return {
                id: response.data.id,
                name: response.data.name,
                gender: response.data.gender,
                age: response.data.age,
              };
            } else {
              return el;
            }
          })
        );
      }
    }

    modalHandler();
  };

  const deleteUser = useCallback(
    async (id) => {
      const response = await callAPI({
        method: "DELETE",
        url: `http://localhost:5005/users/${id}`,
      });
      if (response.status === 200) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    },
    [callAPI]
  );

  const modalHandler = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  const selectedUser = useCallback(
    (userData) => {
      userSelectedRef.current = userData;
      modalHandler();
    },
    [modalHandler]
  );

  return (
    <>
      <Modal show={show} closeHandler={modalHandler}>
        <Form saveUser={saveUser} selectedUser={userSelectedRef} />
      </Modal>
      <Container>
        <Button onClick={modalHandler}>Insert User</Button>
        <br />
        <Input
          placeholder="Filter Users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          ref={filterInput}
        />
        <br />
        <Loading loading={loading} error={error}>
          <UserList
            users={users}
            filter={filter}
            deleteUser={deleteUser}
            selectedUser={selectedUser}
          />
        </Loading>
      </Container>
    </>
  );
};

export default App;
