import { combineReducers } from "redux";
import todoReducer, { todoSaga } from "./todo";
import { all } from "redux-saga/effects";

// root saga, root reducer를 생성해줍니다.

const rootReducer = combineReducers({ todoReducer });

export function* rootSaga() {
  yield all([todoSaga()]);
}

export default rootReducer;
