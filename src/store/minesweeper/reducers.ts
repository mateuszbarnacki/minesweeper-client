import * as C from "./constants";

const minesweeperReducer = (state: C.MinesweeperState = {}, action: C.MinesweeperAction) => {
    if (action.type === C.MinesweeperActionType.GetMinesweeperResultsSuccess) {
        return {...state, winners: action.results, isFetching: false};
    } else {
            return state;
    }
};

export default minesweeperReducer;
