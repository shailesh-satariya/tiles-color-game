import {TileColor} from "common";
import {GameActions, NEW_GAME} from "../action-types";

const initialState: TileColor[] = [];

/**
 * @function ColorsReducer
 *
 * @param {TileColor[]} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {TileColor[]} - New state.
 */
const ColorsReducer = (state: TileColor[] = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return action.payload.colors;
        default:
            return state;
    }
}

export default ColorsReducer;
