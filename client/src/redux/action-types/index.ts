import {TileColor, TileGrid} from "common";

export const NEW_GAME = "NEW_GAME";
export const ADD_MOVE = "ADD_MOVE";
export const SOLVED = "SOLVED";
export const AUTO_SOLVE = "AUTO_SOLVE";
export const AUTO_SOLVED = "AUTO_SOLVED";
export const SOLVE_NEXT_MOVE = "SOLVE_NEXT_MOVE";
export const SOLVE_GAME = "SOLVE_GAME";
export const SERVER_ERROR = "SERVER_ERROR";
export const NO_SERVER_ERROR = "NO_SERVER_ERROR";

interface DefaultAction {
    type: undefined | null;
}

interface StartGameAction {
    type: typeof NEW_GAME;
    payload: {
        colors: TileColor[];
        grid: TileGrid;
    };
}

interface AddMoveAction {
    type: typeof ADD_MOVE;
    payload: {
        color: TileColor;
        grid: TileGrid;
    };
}

interface SolveNextMoveAction {
    type: typeof SOLVE_NEXT_MOVE;
    payload: {
        color: TileColor;
    };
}

interface SolveGameAction {
    type: typeof SOLVE_GAME;
    payload: {
        colors: TileColor[];
    };
}

interface ServerErrorAction {
    type: typeof SERVER_ERROR;
}

interface NoServerErrorAction {
    type: typeof NO_SERVER_ERROR;
}

interface SolvedAction {
    type: typeof SOLVED;
}

interface AutoSolveAction {
    type: typeof AUTO_SOLVE;
}

interface AutoSolvedAction {
    type: typeof AUTO_SOLVED;
}

export type GameActions =
    DefaultAction
    | StartGameAction
    | AddMoveAction
    | SolveNextMoveAction
    | SolveGameAction
    | ServerErrorAction
    | NoServerErrorAction
    | SolvedAction
    | AutoSolveAction
    | AutoSolvedAction;
