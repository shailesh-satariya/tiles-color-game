import {TileColor, TileGrid} from "common";
import {ADD_MOVE, NEW_GAME} from "../../action-types";
import GridReducer from "../grid-reducer";

const grid: TileGrid = [
    [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

test("returns default initial state of `null` when no action is passed", () => {
    const newState = GridReducer(undefined, {type: undefined});
    expect(newState).toBe(null);
});

test("returns state of new grid upon receiving an action of type `NEW_GAME`", () => {
    const newState = GridReducer(null, {type: NEW_GAME, payload: {grid, colors: []}});
    expect(newState).toEqual(grid);
});

test("returns state of changed grid upon receiving an action of type `ADD_MOVE`", () => {
    const newGrid: TileGrid = [
        [{color: TileColor.COLOR3, traversed: true}, {color: TileColor.COLOR3, traversed: true}],
        [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
    ];

    const newState = GridReducer(grid, {type: ADD_MOVE, payload: {color: TileColor.COLOR3, grid: newGrid}});
    expect(newState).toBe(newGrid);
});
