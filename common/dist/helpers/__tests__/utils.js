"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../types");
var utils_1 = require("../utils");
describe("getRandomInteger", function () {
    test("returns correct integer", function () {
        var min = 10;
        var max = 100;
        var random = utils_1.getRandomInteger(min, max);
        expect(random).toBeGreaterThanOrEqual(min);
        expect(random).toBeLessThanOrEqual(max);
    });
});
describe("getColors", function () {
    test("returns correct color array when valid max number specified", function () {
        var maxColors = 5;
        var colors = utils_1.getColors(maxColors);
        expect(colors.length).toBe(maxColors);
    });
    test("returns correct color array when bigger number specified", function () {
        var maxColors = 50;
        var validColors = ((Object.values(types_1.TileColor)).filter(function (v) { return !isNaN(v); }));
        var colors = utils_1.getColors(maxColors);
        expect(colors).toEqual(validColors);
    });
    test("returns correct color array when valid max number specified", function () {
        var maxColors = 2;
        var colors = utils_1.getColors(maxColors);
        expect(colors.length).toBe(3);
    });
});
describe("getRandomColor", function () {
    test("returns a random color from a colors array", function () {
        var colors = utils_1.getColors(5);
        var color = utils_1.getRandomColor(colors);
        expect(colors.includes(color)).toBe(true);
    });
});
describe("createGrid, getTile", function () {
    var grid;
    var rows = 6;
    var columns = 6;
    var colors = utils_1.getColors(3);
    beforeEach(function () {
        grid = utils_1.createGrid(rows, columns, colors);
    });
    describe("createGrid", function () {
        test("returns correct grid with correct size", function () {
            expect(grid.length).toBe(rows);
            expect(grid[0].length).toBe(columns);
        });
        test("returns correct grid with correct values", function () {
            expect(colors.includes(grid[0][0].color)).toBe(true);
            // The first tile must be traversed
            expect(grid[0][0].traversed).toBe(true);
        });
    });
    describe("getTile", function () {
        test("returns correct tile when correct position specified", function () {
            var tile = utils_1.getTile(grid, utils_1.getRandomInteger(0, rows - 1), utils_1.getRandomInteger(0, columns - 1));
            expect(tile).not.toBe(null);
            expect(tile && colors.includes(tile.color)).toBe(true);
        });
        test("returns null when incorrect position specified", function () {
            var tile = utils_1.getTile(grid, -1, 0);
            expect(tile).toBe(null);
        });
    });
    describe("getNeighbours", function () {
        test("returns neighbours when tile is not on any edge/corner", function () {
            var neighbours = utils_1.getNeighbours(grid, 2, 2);
            expect(neighbours.length).toBe(4);
        });
        test("returns neighbours when tile is on edge, but not on corner", function () {
            var neighbours = utils_1.getNeighbours(grid, 0, 2);
            expect(neighbours.length).toBe(3);
        });
        test("returns neighbours when tile is corner", function () {
            var neighbours = utils_1.getNeighbours(grid, 0, 0);
            expect(neighbours.length).toBe(2);
        });
    });
});
describe("getNeighboursPositions", function () {
    test("returns correct neighbours positions", function () {
        var x = 6;
        var y = 4;
        var positions = utils_1.getNeighboursPositions(x, y);
        expect(positions).toEqual([
            { x: 5, y: 4 },
            { x: 6, y: 5 },
            { x: 7, y: 4 },
            { x: 6, y: 3 } // Left
        ]);
    });
});
describe("traverse", function () {
    var grid;
    beforeEach(function () {
        grid = [
            [{ color: types_1.TileColor.COLOR1, traversed: true }, {
                    color: types_1.TileColor.COLOR3,
                    traversed: false
                }, { color: types_1.TileColor.COLOR8, traversed: false }],
            [{ color: types_1.TileColor.COLOR3, traversed: false }, {
                    color: types_1.TileColor.COLOR5,
                    traversed: false
                }, { color: types_1.TileColor.COLOR1, traversed: false }],
        ];
    });
    test("returns new changed grid when correct adjacent color to origin has been selected", function () {
        var newGrid = utils_1.traverse(grid, types_1.TileColor.COLOR3);
        expect(newGrid).toEqual([
            [{ color: types_1.TileColor.COLOR3, traversed: true }, {
                    color: types_1.TileColor.COLOR3,
                    traversed: true
                }, { color: types_1.TileColor.COLOR8, traversed: false }],
            [{ color: types_1.TileColor.COLOR3, traversed: true }, {
                    color: types_1.TileColor.COLOR5,
                    traversed: false
                }, { color: types_1.TileColor.COLOR1, traversed: false }],
        ]);
    });
    test("returns new unchanged grid when not adjacent color to origin has been selected", function () {
        var newGrid = utils_1.traverse(grid, types_1.TileColor.COLOR5);
        expect(newGrid).toEqual([
            [{ color: types_1.TileColor.COLOR5, traversed: true }, {
                    color: types_1.TileColor.COLOR3,
                    traversed: false
                }, { color: types_1.TileColor.COLOR8, traversed: false }],
            [{ color: types_1.TileColor.COLOR3, traversed: false }, {
                    color: types_1.TileColor.COLOR5,
                    traversed: false
                }, { color: types_1.TileColor.COLOR1, traversed: false }],
        ]);
    });
    test("returns new unchanged grid when same origin has been selected", function () {
        var newGrid = utils_1.traverse(grid, types_1.TileColor.COLOR1);
        expect(newGrid).toEqual(grid);
    });
});
describe("isTraversed", function () {
    test("returns true when all tiles have been traversed", function () {
        var grid = [
            [{ color: types_1.TileColor.COLOR1, traversed: true }, { color: types_1.TileColor.COLOR1, traversed: true }],
            [{ color: types_1.TileColor.COLOR1, traversed: true }, { color: types_1.TileColor.COLOR1, traversed: true }],
        ];
        var bTraversed = utils_1.isTraversed(grid);
        expect(bTraversed).toBe(true);
    });
    test("returns false when all tiles not have been traversed", function () {
        var grid = [
            [{ color: types_1.TileColor.COLOR1, traversed: true }, { color: types_1.TileColor.COLOR3, traversed: false }],
            [{ color: types_1.TileColor.COLOR5, traversed: false }, { color: types_1.TileColor.COLOR1, traversed: false }],
        ];
        var bTraversed = utils_1.isTraversed(grid);
        expect(bTraversed).toBe(false);
    });
});
describe("convertGridToNumberedArray & convertNumberedArrayToGrid", function () {
    var grid = [
        [
            { color: types_1.TileColor.COLOR3, traversed: true }, {
                color: types_1.TileColor.COLOR1,
                traversed: false
            }, { color: types_1.TileColor.COLOR2, traversed: false }
        ],
        [
            { color: types_1.TileColor.COLOR4, traversed: false }, {
                color: types_1.TileColor.COLOR1,
                traversed: false
            }, { color: types_1.TileColor.COLOR4, traversed: false }
        ],
        [
            { color: types_1.TileColor.COLOR1, traversed: false }, {
                color: types_1.TileColor.COLOR2,
                traversed: false
            }, { color: types_1.TileColor.COLOR2, traversed: false }
        ]
    ];
    var numberedArr = [
        [3, 1, 2], [4, 1, 4], [1, 2, 2]
    ];
    test("convertGridToNumberedArray returns correct array 2d array", function () {
        var resultNumberedArr = utils_1.convertGridToNumberedArray(grid);
        expect(resultNumberedArr).toEqual(numberedArr);
    });
    test("convertGridToNumberedArray returns correct array 2d array", function () {
        var resultGrid = utils_1.convertNumberedArrayToGrid(numberedArr);
        expect(resultGrid).toEqual(grid);
    });
});
