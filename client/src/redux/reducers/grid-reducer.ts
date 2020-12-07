import {TileGrid} from "common";
import {ADD_MOVE, GameActions, NEW_GAME} from "../action-types";

const initialState: TileGrid | null = null;

/**
 * @function GridReducer
 *
 * @param {TileGrid | null} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {TileGrid | null} - New state.
 */
const GridReducer = (state: TileGrid | null = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return action.payload.grid;
        case ADD_MOVE:
            return action.payload.grid;
        default:
            return state;
    }
}

export default GridReducer;
