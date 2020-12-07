import {GameState} from "common";
import {ReactWrapper, ShallowWrapper} from "enzyme";
import {applyMiddleware, createStore, Store} from "redux";
import {GameActions} from "../redux/action-types";

import rootReducer from "../redux/reducers";
import {middlewares, RootState} from "../redux/store";

/**
 * Default root state
 */
export const DefaultState: RootState = {
    initialGrid: null,
    moves: [],
    colors: [],
    grid: null,
    gameState: GameState.NOT_STARTED,
    nextMove: null,
    aiMoves: null,
    serverError: false
};

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer, middlewares.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 *
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState: RootState = DefaultState): Store<RootState, GameActions> => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState);
}

/**
 * Return node(s) with the given data-test attribute.
 * @param {ReactWrapper | ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 *
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: ReactWrapper | ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
}
