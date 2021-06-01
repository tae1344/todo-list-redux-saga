import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, getTodos, deleteTodo, updateTodo, checkTodo } from "../../modules/todo";

import "./index.css";
import checkImg from "../../assets/images/done_white.png";

const Todo = ({ todos }) => {
  const [input, setInput] = useState("");
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  // 등록/수정 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      // 아이템 수정 시
      dispatch(updateTodo(id, input));
    } else {
      // 아이템 등록 시
      dispatch(addTodo(input));
    }
    setInput("");
    setIsUpdate(false);
    setId("");
  };

  // 삭제 핸들러
  const handleRemove = (id) => {
    dispatch(deleteTodo(id));
  };
  // 수정 핸들러
  const handleUpdate = (id, content) => {
    setInput(content);
    setIsUpdate(true);
    setId(id);
  };
  // 체크 클릭 핸들러
  const handleCheck = (e, id, isCheck, content) => {
    dispatch(checkTodo(id, !isCheck));
  };

  return (
    <div className="todo-container">
      <div className="todo-title">
        <h1>To Do List</h1>
      </div>
      <div className="todo-form-wrap">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input className="todo-input" value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="btn btn-submit" type="submit">
            {isUpdate ? "수정완료" : "등록"}
          </button>
        </form>
      </div>
      <div className="todo-list-wrap">
        {todos
          ? todos.map((todo) => {
              const { id, content, isCheck } = todo;

              return (
                <div className="todo-list-item" key={id}>
                  <img
                    src={checkImg}
                    className="btn btn-check"
                    onClick={(e) => handleCheck(e, id, isCheck, content)}
                  ></img>
                  <span className="todo-content">{content}</span>
                  <div>
                    <button className="btn mr-0" onClick={() => handleUpdate(id, content)}>
                      수정
                    </button>
                    <button className="btn" onClick={() => handleRemove(id)}>
                      삭제
                    </button>
                  </div>
                </div>
              );
            })
          : "등록 된 리스트가 없습니다."}
      </div>
    </div>
  );
};

export default Todo;
