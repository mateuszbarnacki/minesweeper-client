import ApplicationState from "../constants";

export const getMinesweeperResults = (state: ApplicationState) => state.minesweeper.winners;

export const getMinesweeperFetchingStatus = (state: ApplicationState) => state.minesweeper.isFetching;