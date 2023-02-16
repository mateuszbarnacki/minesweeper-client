import * as P from "./paths";
import req from './request';
import {MinesweeperDto} from "./apiModels";

export const getMinesweeperResults = async () => req.get(P.minesweeper);

export const addMinesweeperResult = async (result: MinesweeperDto) => req.post(P.minesweeper, result);