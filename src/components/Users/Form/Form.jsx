import { useState, useEffect } from "react";
import { Button, Input } from "../../Layout";

const initState = { id: null, name: "", age: "", gender: "" };

const Form = ({ saveUser, selectedUser }) => {
  const [input, setInput] = useState(initState);

  useEffect(() => {
    if (selectedUser.current && Object.keys(selectedUser.current).length > 0) {
      setInput((prev) => ({ ...prev, ...selectedUser.current }));
    }
  }, [selectedUser]);

  const inputHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "age") {
      value = +value;
    }

    setInput({ ...input, [name]: value });
  };

  const resetHandler = () => {
    setInput(initState);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const userInfo = { ...input };
    if (!userInfo.id) {
      userInfo.crud = "insert";
    } else {
      userInfo.crud = "edit";
    }

    saveUser(userInfo);
    setInput(initState);
  };

  return (
    <form onSubmit={formHandler}>
      <Input
        name="name"
        placeholder="Insert name"
        value={input.name}
        onChange={inputHandler}
      />
      <Input
        name="gender"
        placeholder="Insert gender"
        value={input.gender}
        onChange={inputHandler}
      />
      <Input
        name="age"
        placeholder="Insert Age"
        value={input.age}
        onChange={inputHandler}
      />
      <Button>Submit</Button>
      <Button type="reset" onClick={resetHandler}>
        Reset
      </Button>
    </form>
  );
};

export default Form;
