import {GameState} from "common";
import {AUTO_SOLVE, AUTO_SOLVED, GameActions, NEW_GAME, SOLVED} from "../action-types";

const initialState: GameState = GameState.NOT_STARTED;

/**
 * @function GameStateReducer
 *
 * @param {GameState} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {GameState} - New state.
 */
const GameStateReducer = (state: GameState = initialState, action: GameActions) => {
    switch (action.type) {
        case NEW_GAME:
            return GameState.IN_PROGRESS;
        case AUTO_SOLVE:
            return GameState.AUTO_SOLVE;
        case SOLVED:
            return GameState.SOLVED;
        case AUTO_SOLVED:
            return GameState.AUTO_SOLVED;
        default:
            return state;
    }
}

export default GameStateReducer;
