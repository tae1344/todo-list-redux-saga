import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { getTodos } from "../modules/todo";

const TodoContainer = () => {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  console.log("todos", todos);

  return <Todo todos={todos.payload} />;
};

export default TodoContainer;
