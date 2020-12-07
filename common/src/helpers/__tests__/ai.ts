import {TileColor, TileGrid} from "../../types";
import {getHeuristic, getHeuristicColor, solveGame, solveNextMove} from "../ai";
import {cloneGrid, isTraversed, traverse} from "../utils";

const grid: TileGrid = [
    [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

describe("solveGame", () => {
    test("finds optimal solution for grid", () => {
        const colors: TileColor[] = solveGame(grid);
        let tmpGrid: TileGrid = cloneGrid(grid);
        for (const color of colors) {
            tmpGrid = traverse(tmpGrid, color);
        }

        expect(colors.length).toBe(3);
        expect(isTraversed(tmpGrid)).toBe(true);
    });
});

describe("solveNextMove", () => {
    test("solves next step for grid", () => {
        const color: TileColor | null = solveNextMove(grid);

        expect(color).toBe(TileColor.COLOR3);
    });
});

describe("getHeuristic & getHeuristicColor", () => {
    const grid: TileGrid = [
        [
            {color: TileColor.COLOR3, traversed: true}, {
            color: TileColor.COLOR1,
            traversed: true
        }, {color: TileColor.COLOR2, traversed: false}
        ],
        [
            {color: TileColor.COLOR4, traversed: false}, {
            color: TileColor.COLOR1,
            traversed: true
        }, {color: TileColor.COLOR4, traversed: false}
        ],
        [
            {color: TileColor.COLOR1, traversed: false}, {
            color: TileColor.COLOR2,
            traversed: false
        }, {color: TileColor.COLOR2, traversed: false}
        ]
    ];

    test("gets correct heuristic grid", () => {
        const heuristic: number = getHeuristic(grid);
        expect(heuristic).toBe(6);
    });

    test("gets correct color heuristic grid", () => {
        const heuristic: number = getHeuristicColor(grid, TileColor.COLOR4);
        expect(heuristic).toBe(2);
    });
});
