import {TileColor} from "common";
import {SOLVE_NEXT_MOVE, SOLVED} from "../../action-types";
import NextMoveReducer from "../next-move-reducer";

test("returns default initial state of null when no action is passed", () => {
    const newState = NextMoveReducer(undefined, {type: undefined});
    expect(newState).toBe(null);
});

test("returns state of `GameState.IN_PROGRESS` upon receiving an action of type which is not `SOLVE_NEXT_MOVE`", () => {
    const newState = NextMoveReducer(TileColor.COLOR3, {type: SOLVED});
    expect(newState).toBe(null);
});

test("returns state of `GameState.SOLVED` upon receiving an action of type `SOLVE_NEXT_MOVE`", () => {
    const newState = NextMoveReducer(null, {type: SOLVE_NEXT_MOVE, payload: {color: TileColor.COLOR3}});
    expect(newState).toBe(TileColor.COLOR3);
});
