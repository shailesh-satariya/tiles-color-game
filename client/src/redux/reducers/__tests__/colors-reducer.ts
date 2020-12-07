import {TileColor} from "common";
import {NEW_GAME} from "../../action-types";
import ColorsReducer from "../colors-reducer";

const colors: TileColor[] = [TileColor.COLOR1, TileColor.COLOR2, TileColor.COLOR3, TileColor.COLOR5];

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = ColorsReducer(undefined, {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of new colors array upon receiving an action of type `NEW_GAME`", () => {
    const newState = ColorsReducer([], {type: NEW_GAME, payload: {grid: [], colors}});
    expect(newState).toEqual(colors);
});

