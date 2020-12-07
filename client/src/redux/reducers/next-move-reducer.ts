import {TileColor} from "common";
import {ADD_MOVE, AUTO_SOLVED, GameActions, NEW_GAME, SOLVE_NEXT_MOVE, SOLVED} from "../action-types";

const initialState: TileColor | null = null;

/**
 * @function NextMoveReducer
 *
 * @param {TileColor | null} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 * @returns {TileColor | null} - New state.
 */
const NextMoveReducer = (state: TileColor | null = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
        case ADD_MOVE:
        case SOLVED:
        case AUTO_SOLVED:
            return initialState;
        case SOLVE_NEXT_MOVE:
            return action.payload.color;
        default:
            return state;
    }
}

export default NextMoveReducer;
