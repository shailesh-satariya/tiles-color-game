"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberedArrayToGrid = exports.convertGridToNumberedArray = exports.getTile = exports.getNeighbours = exports.getNeighboursPositions = exports.isTraversed = exports.getColors = exports.getRandomColor = exports.traverse = exports.createGrid = exports.getRandomInteger = exports.cloneGrid = exports.AllColors = void 0;
var types_1 = require("../types");
/**
 * All valid colors as numbers
 */
var AllColors = ((Object.values(types_1.TileColor)).filter(function (v) { return !isNaN(v); }));
exports.AllColors = AllColors;
/**
 * Returns a random number between a given range
 * @function getRandomInteger
 *
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandomInteger = getRandomInteger;
/**
 * Gets colors array
 * @function getColors
 *
 * @param {number} maxColors
 *
 * @return {TileColor[]}
 */
var getColors = function (maxColors) {
    return AllColors.slice(0, Math.max(3, Math.min(AllColors.length, maxColors)));
};
exports.getColors = getColors;
/**
 * returns a random color from an array of colors
 * @function getRandomColor
 *
 * @param {TileColor[]} colors
 *
 * @return {TileColor}
 */
var getRandomColor = function (colors) {
    return colors[Math.floor(Math.random() * colors.length)];
};
exports.getRandomColor = getRandomColor;
/**
 * Creates grid for new game
 * @function createGrid
 *
 * @param {number} rows
 * @param {number} columns
 * @param {TileColor[]} colors
 *
 * @return {TileGrid}
 */
var createGrid = function (rows, columns, colors) {
    var grid = Array.from({ length: rows }).map(function () {
        return Array.from({ length: columns }).map(function () { return ({
            color: colors[Math.floor(Math.random() * colors.length)],
            traversed: false
        }); });
    });
    return traverse(grid, grid[0][0].color);
};
exports.createGrid = createGrid;
/**
 * Clones the given grid
 * @function cloneGrid
 *
 * @param {TileGrid} grid
 *
 * @return {TileGrid}
 */
var cloneGrid = function (grid) { return grid.map(function (row) {
    return row.map(function (_a) {
        var color = _a.color, traversed = _a.traversed;
        return ({ color: color, traversed: traversed });
    });
}); };
exports.cloneGrid = cloneGrid;
/**
 * Gets tile at given position
 * @function getTile
 * @param {TileGrid} grid
 * @param {number} x
 * @param {number} y
 *
 * @return {Tile | null}
 */
var getTile = function (grid, x, y) {
    return grid[x] && grid[x][y] ? grid[x][y] : null;
};
exports.getTile = getTile;
/**
 * returns neighbours position
 * @function getNeighboursPositions
 *
 * @param {number} x
 * @param {number} y
 *
 * @return {TileGridPosition[]}
 */
var getNeighboursPositions = function (x, y) {
    return [
        { x: x - 1, y: y },
        { x: x, y: y + 1 },
        { x: x + 1, y: y },
        { x: x, y: y - 1 } // Left
    ];
};
exports.getNeighboursPositions = getNeighboursPositions;
/**
 * Gets neighbours of given position
 * @function getNeighbours
 *
 * @param {TileGrid} grid
 * @param {number} x
 * @param {number} y
 *
 * @return {Tile | null}
 */
var getNeighbours = function (grid, x, y) {
    var positions = getNeighboursPositions(x, y);
    return positions.reduce(function (tiles, position) {
        var tile = getTile(grid, position.x, position.y);
        if (tile) {
            tiles.push(tile);
        }
        return tiles;
    }, []);
};
exports.getNeighbours = getNeighbours;
/**
 * Traversed the grid with give color
 * @function traverse
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {TileGrid}
 */
var traverse = function (grid, color) {
    var clonedGrid = cloneGrid(grid);
    var visited = {};
    var checkForTraverse = function (x, y) {
        var key = x + "-" + y;
        if (visited[key]) {
            return;
        }
        visited[key] = true;
        var tile = getTile(grid, x, y);
        if (!tile) {
            return;
        }
        if ((tile.color === color) !== tile.traversed) {
            gridTraverse(x, y);
        }
    };
    var gridTraverse = function (x, y) {
        var tile = getTile(clonedGrid, x, y);
        if (!tile) {
            return;
        }
        if (tile.color === color) {
            tile.traversed = true;
        }
        if (tile.traversed) {
            tile.color = color;
        }
        var positions = getNeighboursPositions(x, y);
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            checkForTraverse(position.x, position.y);
        }
    };
    checkForTraverse(0, 0);
    return clonedGrid;
};
exports.traverse = traverse;
/**
 * Checks whether grid is fully traversed on not
 * @function isTraversed
 *
 * @param {TileGrid} grid
 *
 * @return {boolean}
 */
var isTraversed = function (grid) {
    for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
        var row = grid_1[_i];
        for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
            var tile = row_1[_a];
            if (!tile.traversed) {
                return false;
            }
        }
    }
    return true;
};
exports.isTraversed = isTraversed;
/**
 * Converts TileGrid to 2D numbered Array
 * @function convertGridToNumberedArray
 *
 * @param {TileGrid} grid
 *
 * @return {number[][]}
 */
var convertGridToNumberedArray = function (grid) { return grid.map(function (row) {
    return row.map(function (tile) { return tile.color; });
}); };
exports.convertGridToNumberedArray = convertGridToNumberedArray;
/**
 * Converts 2D numbered Array to TileGrid
 * @function convertNumberedArrayToGrid
 *
 * @param {number[][]} gridArr
 *
 * @return {TileGrid}
 */
var convertNumberedArrayToGrid = function (gridArr) {
    var grid = gridArr.map(function (row) {
        return row.map(function (color) { return ({
            color: color,
            traversed: false
        }); });
    });
    return traverse(grid, grid[0][0].color);
};
exports.convertNumberedArrayToGrid = convertNumberedArrayToGrid;
