"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeuristicColor = exports.getHeuristic = exports.solveNextMove = exports.solveGame = void 0;
var utils_1 = require("./utils");
/**
 * Gets remaining untraversed tiles count value
 * @function getHeuristic
 *
 * @param {TileGrid} grid
 *
 * @return {number}
 */
var getHeuristic = function (grid) { return grid.reduce(function (v1, row) {
    return v1 + row.reduce(function (v2, tile) { return (v2 + (!tile.traversed ? 1 : 0)); }, 0);
}, 0); };
exports.getHeuristic = getHeuristic;
/**
 * Gets remaining untraversed tiles count value for given color
 * @function getHeuristicColor
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {number}
 */
var getHeuristicColor = function (grid, color) { return grid.reduce(function (v1, row) {
    return v1 + row.reduce(function (v2, tile) { return (v2 + ((!tile.traversed && tile.color === color) ? 1 : 0)); }, 0);
}, 0); };
exports.getHeuristicColor = getHeuristicColor;
/**
 * Solves the game and returns the color moves
 * @function solveGame
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor[]}
 */
var solveGame = function (grid) {
    var colors = [];
    var currentGrid = grid;
    while (!utils_1.isTraversed(currentGrid)) {
        var color = solveNextMove(currentGrid);
        if (color === null) {
            break;
        }
        colors.push(color);
        currentGrid = utils_1.traverse(currentGrid, color);
    }
    return colors;
};
exports.solveGame = solveGame;
/**
 * Solves next color move
 * @function solveNextMove
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor|null}
 */
var solveNextMove = function (grid) {
    var nextColor = null;
    // Gets the neighbours of traversed
    var colorSet = new Set();
    var i, j;
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            var tile = grid[i][j];
            if (tile.traversed) {
                var neighbours = utils_1.getNeighbours(grid, i, j);
                for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {
                    var neighbour = neighbours_1[_i];
                    if (!neighbour.traversed) {
                        colorSet.add(neighbour.color);
                    }
                }
            }
        }
    }
    // Find the color with min heuristic
    var color;
    var minHeuristic = Number.MAX_SAFE_INTEGER;
    // Prioritize the colors
    var colors = Array.from(colorSet.values());
    colors.sort(function (c1, c2) { return utils_1.AllColors.indexOf(c1) - utils_1.AllColors.indexOf(c2); });
    for (var _a = 0, colors_1 = colors; _a < colors_1.length; _a++) {
        color = colors_1[_a];
        var newGrid = utils_1.traverse(grid, color);
        // Select the color if its heuristic is 0
        if (getHeuristicColor(newGrid, color) === 0) {
            return color;
        }
        var heuristic = getHeuristic(newGrid);
        if (heuristic === 0) {
            return color;
        }
        else if (heuristic < minHeuristic) {
            nextColor = color;
            minHeuristic = heuristic;
        }
    }
    return nextColor;
};
exports.solveNextMove = solveNextMove;
