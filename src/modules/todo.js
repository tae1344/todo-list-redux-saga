import axios from "axios";
import { call, put, take, takeEvery } from "redux-saga/effects";

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
const UPDATE_TODO_SUCCESS = "todo/UPDATE_TODO_SUCCESS";
const UPDATE_TODO_ERROR = "todo/UPDATE_TODO_ERROR";
const CHECK_TODO_SUCCESS = "todo/CHECK_TODO_SUCCESS";
const CHECK_TODO_ERROR = "todo/CHECK_TODO_ERROR";

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

// saga
// 목록 불러오는 saga
function* getTodosSaga() {
  try {
    const lists = yield call(() =>
      axios.get(`/todo`).then((res) => {
        return res.data.todoList;
      })
    );
    yield put({ type: GET_TODOS_SUCCESS, payload: lists });
  } catch (error) {
    yield put({ type: GET_TODOS_ERROR, error: error });
  }
}

// 목록 추가 saga
function* addTodoSaga({ payload }) {
  const param = { payload };
  try {
    const result = yield call(() =>
      axios.post(`/todo`, param.payload).then((res) => {
        return res.data;
      })
    );
    // console.log("result :: ", result);
    yield put({ type: GET_TODOS });
  } catch (error) {
    yield put({ type: ADD_TODO_ERROR, error: error });
  }
}

// 목록 삭제 saga
function* deleteTodoSaga({ payload }) {
  const id = payload.id;
  try {
    const result = yield call(() =>
      axios.delete(`/todo/${id}`).then((res) => {
        return res.data;
      })
    );
    // console.log("result :: ", result);
    yield put({ type: DELETE_TODO_SUCCESS, payload: { id } });
  } catch (error) {
    yield put({ type: DELETE_TODO_ERROR, error: error });
  }
}

// 목록 수정 saga
function* updateTodoSaga({ payload }) {
  const id = payload.id;
  const content = payload.content;
  try {
    const result = yield call(() =>
      axios.post(`/todo/${id}`, { content }).then((res) => {
        return res.data;
      })
    );
    // console.log("result :: ", result);
    yield put({ type: GET_TODOS });
  } catch (error) {
    yield put({ type: UPDATE_TODO_ERROR, error: error });
  }
}

// 체크 변경 saga
function* checkTodoSaga({ payload }) {
  const id = payload.id;
  const isCheck = payload.isCheck;

  try {
    const result = yield call(() =>
      axios.post(`/todo/${id}`, { isCheck }).then((res) => {
        return res.data;
      })
    );
    // console.log("result :: ", result);
    yield put({ type: DELETE_TODO, payload: { id } });
  } catch (error) {
    yield put({ type: CHECK_TODO_ERROR, error: error });
  }
}

// saga 통합
export function* todoSaga() {
  yield takeEvery(GET_TODOS, getTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
  yield takeEvery(UPDATE_TODO, updateTodoSaga);
  yield takeEvery(CHECK_TODO, checkTodoSaga);
}

// 초기 상태 값
const initState = {
  lists: [],
  payload: "",
};

// reducer
const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      console.log("GET_TODOS ::", action.payload);
      return { ...state, lists: [...action.payload] };
    case ADD_TODO_SUCCESS:
      console.log("ADD_TODO :: ", state);
      return { ...state, lists: [...state.lists, action.payload] };
    case DELETE_TODO_SUCCESS:
      const lists = state.lists.filter((todo) => todo.id !== action.payload.id);
      return { ...state, lists: [...lists] };

    case GET_TODOS_ERROR:
    case ADD_TODO_ERROR:
    case DELETE_TODO_ERROR:
    case CHECK_TODO_ERROR:
    case UPDATE_TODO_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default todoReducer;
