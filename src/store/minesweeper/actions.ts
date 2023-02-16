import { AxiosError } from 'axios';
import { ActionCreator } from 'redux';
import * as C from './constants';
import { MinesweeperDto } from "../../api/apiModels";

export const getMinesweeperResultsRequest: ActionCreator<C.MinesweeperAction> = () => ({
   type: C.MinesweeperActionType.GetMinesweeperResultsRequest,
});

export const getMinesweeperResultsSuccess: ActionCreator<C.MinesweeperAction> = (results: MinesweeperDto[]) => ({
   type: C.MinesweeperActionType.GetMinesweeperResultsSuccess,
   results,
});

export const getMinesweeperResultsFail: ActionCreator<C.MinesweeperAction> = (error: AxiosError) => ({
   type: C.MinesweeperActionType.GetMinesweeperResultsFail,
   error,
});