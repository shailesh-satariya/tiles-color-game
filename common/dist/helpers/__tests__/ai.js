"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
var ai_1 = require("../ai");
var utils_1 = require("../utils");
var grid = [
    [{ color: types_1.TileColor.COLOR1, traversed: true }, { color: types_1.TileColor.COLOR3, traversed: false }],
    [{ color: types_1.TileColor.COLOR5, traversed: false }, { color: types_1.TileColor.COLOR1, traversed: false }],
];
describe("solveGame", function () {
    test("finds optimal solution for grid", function () {
        var colors = ai_1.solveGame(grid);
        var tmpGrid = utils_1.cloneGrid(grid);
        for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
            var color = colors_1[_i];
            tmpGrid = utils_1.traverse(tmpGrid, color);
        }
        expect(colors.length).toBe(3);
        expect(utils_1.isTraversed(tmpGrid)).toBe(true);
    });
});
describe("solveNextMove", function () {
    test("solves next step for grid", function () {
        var color = ai_1.solveNextMove(grid);
        expect(color).toBe(types_1.TileColor.COLOR3);
    });
});
describe("getHeuristic & getHeuristicColor", function () {
    var grid = [
        [
            { color: types_1.TileColor.COLOR3, traversed: true }, {
                color: types_1.TileColor.COLOR1,
                traversed: true
            }, { color: types_1.TileColor.COLOR2, traversed: false }
        ],
        [
            { color: types_1.TileColor.COLOR4, traversed: false }, {
                color: types_1.TileColor.COLOR1,
                traversed: true
            }, { color: types_1.TileColor.COLOR4, traversed: false }
        ],
        [
            { color: types_1.TileColor.COLOR1, traversed: false }, {
                color: types_1.TileColor.COLOR2,
                traversed: false
            }, { color: types_1.TileColor.COLOR2, traversed: false }
        ]
    ];
    test("gets correct heuristic grid", function () {
        var heuristic = ai_1.getHeuristic(grid);
        expect(heuristic).toBe(6);
    });
    test("gets correct color heuristic grid", function () {
        var heuristic = ai_1.getHeuristicColor(grid, types_1.TileColor.COLOR4);
        expect(heuristic).toBe(2);
    });
});
