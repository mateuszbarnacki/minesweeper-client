import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./rootSaga";
import {configureStore} from '@reduxjs/toolkit';
import minesweeperReducer from "./minesweeper/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        minesweeper: minesweeperReducer
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;