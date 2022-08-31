import {MinesweeperQueryParams, SnakeQueryParams, TetrisQueryParams} from "../store/games/constants";
import * as paths from './paths';
import req from './request';
import {
    MinesweeperDto,
    SnakeDto,
    TetrisDto
} from "./apiModels";

export const getMinesweeperRanking = async () => req.get(paths.minesweeper);

export const getMinesweeperUserRanking = async (queryParams: MinesweeperQueryParams) => req.get(
    paths.minesweeper_user + queryParams.username
);

export const addMinesweeperResult = async (result: MinesweeperDto) => req.post(paths.minesweeper, result);

export const getSnakeRanking = async () => req.get(paths.snake);

export const getSnakeUserRanking = async (queryParams: SnakeQueryParams) => req.get(
    paths.snake_user + queryParams.username
);

export const addSnakeResult = async (result: SnakeDto) => req.post(paths.snake, result);

export const getTetrisRanking = async () => req.get(paths.tetris);

export const getTetrisUserRanking = async (queryParams: TetrisQueryParams) => req.get(
    paths.tetris_user + queryParams.username
);

export const addTetrisResult = async (result: TetrisDto) => req.post(paths.tetris, result);