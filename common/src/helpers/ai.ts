import {Tile, TileColor, TileGrid, TileRow} from "../types";
import {AllColors, getNeighbours, isTraversed, traverse} from "./utils";

/**
 * Gets remaining untraversed tiles count value
 * @function getHeuristic
 *
 * @param {TileGrid} grid
 *
 * @return {number}
 */
const getHeuristic = (grid: TileGrid): number => grid.reduce((v1: number, row: TileRow) =>
    v1 + row.reduce((v2: number, tile: Tile) => (v2 + (!tile.traversed ? 1 : 0)), 0)
    , 0);


/**
 * Gets remaining untraversed tiles count value for given color
 * @function getHeuristicColor
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {number}
 */
const getHeuristicColor = (grid: TileGrid, color: TileColor): number => grid.reduce((v1: number, row: TileRow) =>
    v1 + row.reduce((v2: number, tile: Tile) => (v2 + ((!tile.traversed && tile.color === color) ? 1 : 0)), 0)
    , 0);

/**
 * Solves the game and returns the color moves
 * @function solveGame
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor[]}
 */
const solveGame = (grid: TileGrid): TileColor[] => {
    const colors: TileColor[] = [];
    let currentGrid: TileGrid = grid;

    while (!isTraversed(currentGrid)) {
        const color: TileColor | null = solveNextMove(currentGrid);
        if (color === null) {
            break;
        }
        colors.push(color);
        currentGrid = traverse(currentGrid, color);
    }

    return colors;
}

/**
 * Solves next color move
 * @function solveNextMove
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor|null}
 */
const solveNextMove = (grid: TileGrid): TileColor | null => {
    let nextColor: TileColor | null = null;

    // Gets the neighbours of traversed
    const colorSet = new Set<TileColor>();
    let i, j: number;
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            const tile: Tile = grid[i][j];
            if (tile.traversed) {
                const neighbours: Tile[] = getNeighbours(grid, i, j);
                for (const neighbour of neighbours) {
                    if (!neighbour.traversed) {
                        colorSet.add(neighbour.color);
                    }
                }
            }
        }
    }

    // Find the color with min heuristic
    let color: TileColor;
    let minHeuristic: number = Number.MAX_SAFE_INTEGER;

    // Prioritize the colors
    const colors: TileColor[] = Array.from(colorSet.values());
    colors.sort((c1: TileColor, c2: TileColor) => AllColors.indexOf(c1) - AllColors.indexOf(c2));
    for (color of colors) {
        const newGrid: TileGrid = traverse(grid, color);

        // Select the color if its heuristic is 0
        if (getHeuristicColor(newGrid, color) === 0) {
            return color;
        }

        const heuristic: number = getHeuristic(newGrid);
        if (heuristic === 0) {
            return color;
        } else if (heuristic < minHeuristic) {
            nextColor = color;
            minHeuristic = heuristic;
        }
    }


    return nextColor;
}

export {solveGame, solveNextMove, getHeuristic, getHeuristicColor};
