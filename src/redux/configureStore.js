import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

// import logger from "redux-logger";

import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
