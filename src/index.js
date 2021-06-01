import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga } from "./modules";

import App from "./App";

// 스토어, 미들웨어를 생성하고 적용시켜줍니다.

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
