import {all, fork} from "redux-saga/effects";
import {minesweeperResultsWatcher} from "./minesweeper/sagas";

export function* rootSaga() {
    yield all([
        fork(minesweeperResultsWatcher),
    ]);
}