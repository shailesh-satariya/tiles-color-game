import {TileColor} from "common";
import {ADD_MOVE, GameActions, NEW_GAME} from "../action-types";

const initialState: TileColor[] = [];

/**
 * @function MovesReducer
 *
 * @param {TileColor[]} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {TileColor[]} - New state.
 */
const MovesReducer = (state: TileColor[] = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return initialState;
        case ADD_MOVE:
            return [...state, action.payload.color];
        default:
            return state;
    }
}

export default MovesReducer;
