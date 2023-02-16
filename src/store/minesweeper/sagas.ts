import {call, put, takeLatest} from 'redux-saga/effects';
import {getMinesweeperResults} from "../../api";
import {MinesweeperDto} from "../../api/apiModels";
import * as C from "./constants";
import * as A from "./actions";
import {AxiosResponse} from "axios";

function* getMinesweeperResultsWorker() {
    try {
        const {data}: AxiosResponse<MinesweeperDto[]> = yield call(getMinesweeperResults);

        yield put(A.getMinesweeperResultsSuccess(data))
    } catch (error) {
        yield put(A.getMinesweeperResultsFail(error));
    }
}

export function* minesweeperResultsWatcher() {
    yield takeLatest<C.MinesweeperActionType.GetMinesweeperResultsRequest>(C.MinesweeperActionType.GetMinesweeperResultsRequest, getMinesweeperResultsWorker);
}