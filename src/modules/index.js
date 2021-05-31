import { combineReducers } from "redux";
import todoReducer, { todoSaga } from "./todo";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ todoReducer });

export function* rootSaga() {
  yield all([todoSaga()]); // all은 배열 안의 사가를 동시에 실행시켜준다.
}

export default rootReducer;
