import {GameState, TileColor, TileGrid} from "common";
import {Store} from "redux";
import {GameActions} from "../redux/action-types";
import {addMove, newGame} from "../redux/actions";
import {RootState} from "../redux/store";
import {storeFactory} from "../test/utils";

const colors: TileColor[] = [TileColor.COLOR1, TileColor.COLOR2, TileColor.COLOR3];
const grid: TileGrid = [
    [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR2, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

describe("actions dispatcher", () => {
    const store: Store<RootState, GameActions> = storeFactory();
    test("newGame: new game", () => {
        store.dispatch<any>(newGame(grid, colors));
        const expectedState: RootState = {
            initialGrid: grid,
            moves: [],
            colors: colors,
            grid: grid,
            gameState: GameState.IN_PROGRESS,
            nextMove: null,
            aiMoves: null,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });

    test("addMove: update 1st moves correctly", () => {
        store.dispatch<any>(addMove(TileColor.COLOR2));

        const expectedState: RootState = {
            initialGrid: grid,
            moves: [TileColor.COLOR2],
            colors: colors,
            grid: [
                [{color: TileColor.COLOR2, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
                [{color: TileColor.COLOR2, traversed: true}, {color: TileColor.COLOR1, traversed: false}],
            ],
            gameState: GameState.IN_PROGRESS,
            nextMove: null,
            aiMoves: null,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });

    test("addMove: update 2nd moves correctly", () => {
        store.dispatch<any>(addMove(TileColor.COLOR3));

        const expectedState: RootState = {
            initialGrid: grid,
            moves: [TileColor.COLOR2, TileColor.COLOR3],
            colors: colors,
            grid: [
                [{color: TileColor.COLOR3, traversed: true}, {color: TileColor.COLOR3, traversed: true}],
                [{color: TileColor.COLOR3, traversed: true}, {color: TileColor.COLOR1, traversed: false}],
            ],
            gameState: GameState.IN_PROGRESS,
            nextMove: null,
            aiMoves: null,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });

    test("addMove: update 3rd moves and game state correctly", () => {
        store.dispatch<any>(addMove(TileColor.COLOR1));

        const expectedState: RootState = {
            initialGrid: grid,
            moves: [TileColor.COLOR2, TileColor.COLOR3, TileColor.COLOR1],
            colors: colors,
            grid: [
                [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR1, traversed: true}],
                [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR1, traversed: true}],
            ],
            gameState: GameState.SOLVED,
            nextMove: null,
            aiMoves: null,
            serverError: false
        };

        expect(store.getState()).toEqual(expectedState);
    });
});
