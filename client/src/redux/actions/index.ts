import {AxiosResponse} from "axios";
import {
    GameState,
    isTraversed,
    solveGame as solveGameAI,
    solveNextMove as solveNextMoveAI,
    TileColor,
    TileGrid,
    traverse
} from "common";
import {AnyAction, Dispatch} from "redux";
import * as Services from "../../services";

import {
    ADD_MOVE,
    AUTO_SOLVE,
    AUTO_SOLVED,
    NEW_GAME,
    NO_SERVER_ERROR,
    SERVER_ERROR,
    SOLVE_GAME,
    SOLVE_NEXT_MOVE,
    SOLVED
} from "../action-types";
import {RootState} from "../store";

/**
 * Returns Redux Thunk function that dispatches NEW_GAME action
 *     and (conditionally) SOLVED | AUTO_SOLVED action
 * @function newGame
 *
 * @param {TileGrid} grid - new grid.
 * @param {colors} colors set
 *
 * @returns {function} - Redux Thunk function.
 */
export const newGame = (grid: TileGrid, colors: TileColor[]) => (dispatch: Dispatch) => {
    dispatch({
        type: NEW_GAME,
        payload: {grid, colors}
    });

    if (isTraversed(grid)) {
        dispatch({
            type: SOLVED,
            payload: grid
        });
    }
};

/**
 * Returns Redux Thunk function that dispatches ADD_MOVE action
 *     and (conditionally) SOLVED | AUTO_SOLVED action
 * @function addMove
 *
 * @param {TileColor} color - tile color.
 * @returns {function} - Redux Thunk function.
 */
export const addMove = (color: TileColor) => (dispatch: Dispatch, getState: () => RootState) => {
    const {grid: currentGrid, gameState}: RootState = getState();
    const grid: TileGrid | null = currentGrid ? traverse(currentGrid, color) : null;

    dispatch({
        type: ADD_MOVE,
        payload: {
            color, grid
        }
    });

    if (grid && isTraversed(grid)) {
        dispatch({
            type: (gameState === GameState.AUTO_SOLVE) ? AUTO_SOLVED : SOLVED,
            payload: grid
        });
    }
};

/**
 * Returns Redux Thunk function that dispatches NO_SERVER_ERROR action
 * @function setNoServerError
 *
 * @returns {function} - Redux Thunk function.
 */
export const setNoServerError = () => (dispatch: Dispatch) => {
    dispatch({type: NO_SERVER_ERROR})
};

/**
 * Dispatch axios action to solve the game.
 * @function solveNextMoveDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 * @param {() => RootState}  getState
 *
 * @return Promise
 */
export const solveNextMoveDispatch = (dispatch: Dispatch, getState: () => RootState): Promise<any> => {
    const {grid, nextMove}: RootState = getState();

    if (grid === null || nextMove !== null) {
        return new Promise(resolve => {
        });
    }

    const solveNextMoveFn = (color: TileColor | null): void => {
        if (color) {
            dispatch({
                type: SOLVE_NEXT_MOVE,
                payload: {
                    color
                }
            });
        }
    }

    if (process.env.REACT_APP_WITHOUT_API === "1") {
        const color: TileColor | null = grid ? solveNextMoveAI(grid) : null;
        return new Promise(resolve => solveNextMoveFn(color));
    }

    return Services.solveNextMove(grid).then((response: AxiosResponse) => {
        solveNextMoveFn(response.data.color);
    }).catch(() => {
        dispatch({type: SERVER_ERROR});
    });
};

/**
 * Dispatch axios action to solve the game.
 * @function autoSolveDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 * @param {() => RootState}  getState
 *
 * @return Promise
 */
export const autoSolveDispatch = (dispatch: Dispatch, getState: () => RootState): Promise<any> => {
    const {grid: currentGrid, aiMoves}: RootState = getState();

    if (currentGrid === null) {
        return new Promise(resolve => {
        });
    }

    const autoSolver = (colors: TileColor[] | null): void => {
        if (colors === null || !colors.length) {
            return;
        }

        dispatch({
            type: AUTO_SOLVE
        });

        let counter: number = 0;
        let inst: NodeJS.Timeout = setInterval((): void => {
            const color: TileColor = colors[counter];
            counter++;
            if (counter >= colors.length) {
                clearInterval(inst);
            }

            dispatch(addMove(color) as any as AnyAction);
        }, 1000);
    };

    if (process.env.REACT_APP_WITHOUT_API === "1") {
        const colors: TileColor[] | null = (currentGrid && !aiMoves) ? solveGameAI(currentGrid) : null;
        return new Promise(() => autoSolver(colors));
    }

    return Services.solveGame(currentGrid).then((response: AxiosResponse) => {
        autoSolver(response.data.colors);
    }).catch(() => {
        dispatch({type: SERVER_ERROR});
    });
};

/**
 * Dispatch axios action to solve the game.
 * @function solveGameDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch.
 * @param {() => RootState}  getState
 *
 * @return Promise
 */
const solveGameDispatch = (dispatch: Dispatch, getState: () => RootState): Promise<any> => {
    const {initialGrid, aiMoves}: RootState = getState();

    if (initialGrid === null || aiMoves !== null) {
        return new Promise(resolve => {
        });
    }

    const solveGameFn = (colors: TileColor[] | null): void => {
        if (colors && colors.length) {
            dispatch({
                type: SOLVE_GAME,
                payload: {
                    colors
                }
            });
        }
    };

    if (process.env.REACT_APP_WITHOUT_API === "1") {
        const colors: TileColor[] | null = solveGameAI(initialGrid);
        return new Promise(() => solveGameFn(colors));

    }

    return Services.solveGame(initialGrid).then((response: AxiosResponse) => {
        solveGameFn(response.data.colors);
    }).catch(() => {
        dispatch({type: SERVER_ERROR});
    });
};

/**
 * Returns Redux Thunk function that dispatches AUTO_SOLVE action
 *     after axios promise resolves
 * @function autoSolve
 * @returns {function} - Redux Thunk function.
 */
export const autoSolve = () => {
    return autoSolveDispatch;
}

/**
 * Returns Redux Thunk function that dispatches AUTO_SOLVE action
 *     after axios promise resolves
 * @function solveNextMove
 * @returns {function} - Redux Thunk function.
 */
export const solveNextMove = () => {
    return solveNextMoveDispatch;
}

/**
 * Returns Redux Thunk function that dispatches SOLVE_GAME action
 *     after axios promise resolves
 * @function solveGame
 * @returns {function} - Redux Thunk function.
 */
export const solveGame = () => {
    return solveGameDispatch;
}


