import {TileGrid} from "common";
import {GameActions, NEW_GAME} from "../action-types";

const initialState: TileGrid | null = null;

/**
 * @function InitialGridReducer
 *
 * @param {TileGrid | null} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {TileGrid | null} - New state.
 */
const InitialGridReducer = (state: TileGrid | null = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return action.payload.grid;
        default:
            return state;
    }
}

export default InitialGridReducer;
