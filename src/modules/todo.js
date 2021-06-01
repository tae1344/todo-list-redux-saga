import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

// 액션 타입
const ADD_TODO = "todo/ADD_TODO";
const GET_TODOS = "todo/GET_TODOS";
const DELETE_TODO = "todo/DELETE_TODO";
const UPDATE_TODO = "todo/UPDATE_TODO";
const CHECK_TODO = "todo/CHECK_TODO";
const GET_TODOS_SUCCESS = "todo/GET_TODOS_SUCCESS";
const GET_TODOS_ERROR = "todo/GET_TODOS_SUCCESS";
const ADD_TODO_SUCCESS = "todo/ADD_TODO_SUCCESS";
const ADD_TODO_ERROR = "todo/ADD_TODO_ERROR";
const DELETE_TODO_SUCCESS = "todo/DELETE_TODO_SUCCESS";
const DELETE_TODO_ERROR = "todo/DELETE_TODO_ERROR";

// 액션 생성함수
export const getTodos = () => ({ type: GET_TODOS });
export const addTodo = (content) => ({ type: ADD_TODO, payload: { content } });
export const updateTodo = (id, content) => ({
  type: UPDATE_TODO,
  payload: { id, content },
});
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: { id } });
export const checkTodo = (id, isCheck) => ({
  type: CHECK_TODO,
  payload: { id, isCheck },
});

const API_URL = "http://test.paywork.io:8000";
const config = {
  header: {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
};
// saga
function* getTodosSaga() {
  try {
    const lists = yield call(() =>
      axios.get(`/todo`, config).then((res) => {
        console.log("res: ", res.data);
        return res.data.todoList;
      })
    );
    console.log("lists", lists);
    yield put({ type: GET_TODOS_SUCCESS, payload: lists });
  } catch (error) {
    yield put({ type: GET_TODOS_ERROR, error: error });
  }
}

function* addTodoSaga({ payload }) {
  const param = { payload };
  console.log("addTODO :: ", param);
  try {
    const result = yield call(() =>
      axios.post(`/todo`, param.payload, config).then((res) => {
        console.log("res: ", res.data);
        return res.data;
      })
    );
    //console.log("add Todo :: ", param.payload);
    //console.log("add Todo result :: ", result);
    yield put({ type: ADD_TODO_SUCCESS, payload: { content: param.payload.content, isCheck: false } }); // --> reducer에서 해당하는 액션이 실행된다.
  } catch (error) {
    yield put({ type: ADD_TODO_ERROR, error: error });
  }
}

function* deleteTodoSaga({ payload }) {
  const id = payload.id;
  try {
    const result = yield call(() =>
      axios.delete(`/todo/${id}`).then((res) => {
        console.log("res: ", res.data);
        return res.data;
      })
    );

    yield put({ type: DELETE_TODO_SUCCESS, payload: { id } });
  } catch (error) {
    yield put({ type: DELETE_TODO_ERROR, error: error });
  }
}

// saga 통합
export function* todoSaga() {
  yield takeEvery(GET_TODOS, getTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
}

// reducer
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, payload: action.payload };
    case ADD_TODO:
      return { ...state, payload: action.payload };

    case GET_TODOS_SUCCESS:
      console.log("GET_TODOS ::", action.payload);
      return { ...state, payload: [...action.payload] };
    case ADD_TODO_SUCCESS:
      console.log("ADD_TODO :: ", state);

      return { ...state, payload: [...action.payload] };
    case DELETE_TODO_SUCCESS:
      const lists = state.payload.filter((todo) => todo.id !== action.payload.id);
      return { ...state, payload: [...lists] };

    case GET_TODOS_ERROR:
    case ADD_TODO_ERROR:
    case DELETE_TODO_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default todoReducer;
