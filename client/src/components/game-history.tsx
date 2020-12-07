import {TileColor, TileGrid, traverse} from "common";
import React from "react";
import GameGrid from "./game-grid";

export interface GameHistoryProps {
    grid: TileGrid;
    moves: TileColor[]
}

/**
 * GameHistory component -  renders history
 * @function GameHistory
 *
 * @param {GameHistoryProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
const GameHistory = (props: GameHistoryProps): JSX.Element => {
    const {grid, moves}: GameHistoryProps = props;

    let currGrid: TileGrid = grid;
    const hGrids: TileGrid[] = moves.map((color: TileColor) => {
        let newGrid: TileGrid = traverse(currGrid, color);
        currGrid = newGrid;

        return newGrid;
    });

    return (
        <div data-test="component-game-history" className="text-center">
            <div className="mb-3">
                <GameGrid data-test="history-grid" grid={grid}/>
            </div>
            {
                hGrids.map((hGrid: TileGrid, index: number) => (
                    <React.Fragment key={index}>
                        <button data-test="history-tile"
                                className={`color${hGrid[0][0].color} color-picker-button mb-3`}/>
                        <div className="mb-3">
                            <GameGrid data-test="history-grid" grid={hGrid}/>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export default GameHistory;
