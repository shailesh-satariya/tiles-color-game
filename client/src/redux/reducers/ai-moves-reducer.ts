import {TileColor} from "common";
import {GameActions, NEW_GAME, SOLVE_GAME} from "../action-types";

const initialState: TileColor[] | null = null;

/**
 * @function AiMovesReducer
 *
 * @param {TileColor[]} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {TileColor[]} - New state.
 */
const AiMovesReducer = (state: TileColor[] | null = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return initialState;
        case SOLVE_GAME:
            return action.payload.colors;
        default:
            return state;
    }
}

export default AiMovesReducer;
