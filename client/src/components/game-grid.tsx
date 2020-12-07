import {Tile, TileGrid, TileRow} from "common";
import React, {CSSProperties} from "react";

export interface GameGridProps {
    grid: TileGrid;
}

/**
 * GameGrid component - renderers game board
 * @function GameGrid
 *
 * @param {GameGridProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
const GameGrid = (props: GameGridProps): JSX.Element => {
    const {grid} = props;

    const style: CSSProperties = {
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`
    };

    return (
        <div className="game-grid-container">
            <div className="game-grid-wrapper">
                <div data-test="component-game-grid" className="game-grid" style={style}>
                    {
                        grid.map((row: TileRow, ri: number) => (
                            row.map((tile: Tile, ti: number) => (
                                <div data-test="grid-tile" key={`${ri}-${ti}`}
                                     className={(`grid-tile color${tile.color} ` + (tile.traversed ? "traversed" : "untraversed"))}/>
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default GameGrid;
