import {TileColor, TileGrid} from "common";
import {NEW_GAME} from "../../action-types";
import InitialGridReducer from "../initial-grid-reducer";

const grid: TileGrid = [
    [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

test("returns default initial state of `null` when no action is passed", () => {
    const newState = InitialGridReducer(undefined, {type: undefined});
    expect(newState).toBe(null);
});

test("returns state of new grid upon receiving an action of type `NEW_GAME`", () => {
    const newState = InitialGridReducer(null, {type: NEW_GAME, payload: {grid, colors: []}});
    expect(newState).toEqual(grid);
})
