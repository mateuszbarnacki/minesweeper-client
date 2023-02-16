import { AxiosError } from "axios";
import { MinesweeperDto } from "../../api/apiModels";

export enum MinesweeperActionType {
    GetMinesweeperResultsRequest = "GET_MINESWEEPER_RESULTS_REQUEST",
    GetMinesweeperResultsSuccess = "GET_MINESWEEPER_RESULTS_SUCCESS",
    GetMinesweeperResultsFail = "GET_MINESWEEPER_RESULTS_FAIL",
}

export interface MinesweeperState {
    winners?: MinesweeperDto[];
    isFetching?: boolean;
}

export type MinesweeperAction = {
    type: MinesweeperActionType.GetMinesweeperResultsRequest;
} | {
    type: MinesweeperActionType.GetMinesweeperResultsSuccess;
    results: MinesweeperDto[];
} | {
    type: MinesweeperActionType.GetMinesweeperResultsFail;
    error: AxiosError;
}