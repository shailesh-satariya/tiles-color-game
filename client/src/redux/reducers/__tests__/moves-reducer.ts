import {TileColor} from "common";
import {ADD_MOVE, NEW_GAME} from "../../action-types";
import MovesReducer from "../moves-reducer";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = MovesReducer(undefined, {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of non empty color array upon receiving an action of type `ADD_MOVE`", () => {
    const color: TileColor = TileColor.COLOR2;
    const newState = MovesReducer([], {type: ADD_MOVE, payload: {color, grid: []}});
    expect(newState.length).toBe(1);
});

test("returns state of empty color array upon receiving an action of type `NEW_GAME`", () => {
    const newState = MovesReducer([], {type: NEW_GAME, payload: {grid: [], colors: []}});
    expect(newState.length).toBe(0);
});
