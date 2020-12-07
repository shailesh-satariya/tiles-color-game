import {GameActions, NEW_GAME, NO_SERVER_ERROR, SERVER_ERROR} from "../action-types";

const initialState: boolean = false;

/**
 * @function ServerErrorReducer
 *
 * @param {boolean} state - State before reducer.
 * @param {GameActions} action - Action sent to reducer.
 *
 * @returns {boolean} - New state.
 */
const ServerErrorReducer = (state: boolean = initialState, action: GameActions): boolean => {
    switch (action.type) {
        case NEW_GAME:
            return initialState;
        case SERVER_ERROR:
            return true;
        case NO_SERVER_ERROR:
            return false;
        default:
            return state;
    }
};

export default ServerErrorReducer;
