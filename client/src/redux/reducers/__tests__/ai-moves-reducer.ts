import {TileColor} from "common";
import {NEW_GAME, SOLVE_GAME} from "../../action-types";
import AiMovesReducer from "../ai-moves-reducer";

test("returns default initial state of null when no action is passed", () => {
    const newState = AiMovesReducer(undefined, {type: undefined});
    expect(newState).toBe(null);
});

test("returns null upon receiving an action of type `NEW_GAME`", () => {
    const newState = AiMovesReducer([TileColor.COLOR3, TileColor.COLOR1], {
        type: NEW_GAME,
        payload: {colors: [], grid: []}
    });
    expect(newState).toBe(null);
});

test("returns state of `GameState.SOLVED` upon receiving an action of type `SOLVE_NEXT_MOVE`", () => {
    const colors: TileColor[] = [TileColor.COLOR3, TileColor.COLOR1];
    const newState = AiMovesReducer(null, {type: SOLVE_GAME, payload: {colors}});
    expect(newState).toEqual(colors);
});
