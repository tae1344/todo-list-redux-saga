import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo/Todo";
import { getTodos } from "../modules/todo";

const TodoContainer = () => {
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  // 리스트 불러오는 액션 디스패치
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return <Todo todos={todos.lists} />;
};

export default TodoContainer;
