import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, getTodos, deleteTodo } from "../modules/todo";

const Todo = ({ todos }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const done = {
    textDecoration: "line-through",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    //dispatch(getTodos());
    setInput("");
  };

  const handleClick = (id) => {
    console.log("clicked :: ", id);
  };
  const handleRemove = (id) => {
    console.log("removed :: ", id);
    dispatch(deleteTodo(id));
    //dispatch(getTodos());
  };
  const handleUpdate = (id) => {
    console.log("update :: ", id);
  };

  return (
    <>
      <div>
        {/* <form onSubmit={(e) => handleSubmit(e)}> */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">등록</button>
        </form>
      </div>
      <div>
        {todos &&
          todos.map((todo) => {
            const { id, content, isCheck } = todo;
            return (
              <div key={id} style={isCheck ? done : undefined}>
                <span onClick={() => handleClick(id)}>{content}</span>
                <button onClick={() => handleUpdate(id)}>수정</button>
                <button onClick={() => handleRemove(id)}>삭제</button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Todo;
