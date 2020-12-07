import {createGrid, GameState, getColors, TileColor, TileGrid} from "common";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import CONFIG from "../config";
import {autoSolve, newGame, solveNextMove} from "../redux/actions";

import {RootState} from "../redux/store";
import MinMaxSelect from "./min-max-select";

const mapStateToProps = ({initialGrid, colors, gameState, moves}: RootState) => ({
    initialGrid, colors, gameState, moves
});

const connector = connect(mapStateToProps, {newGame, solveNextMove, autoSolve});

export type NavBarProps = ConnectedProps<typeof connector>;

/**
 * NavBar component - renders inputs and buttons
 * @function DisconnectedNavBar
 *
 * @param {NavBarProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
export const DisconnectedNavBar = (props: NavBarProps): JSX.Element => {
    const {newGame, solveNextMove, autoSolve, initialGrid, colors, moves, gameState}: NavBarProps = props;
    const {rows, minRows, maxRows, columns, minColumns, maxColumns, colorsCnt, minColorsCnt, maxColorsCnt} = CONFIG;
    const [rowsVal, setRows] = React.useState(rows);
    const [columnsVal, setColumns] = React.useState(columns);
    const [colorsCntVal, setColorsCnt] = React.useState(colorsCnt);
    const [isNavBarCollapsed, setNavBarCollapsed] = React.useState(false);
    const bDisabled: boolean = (gameState === GameState.AUTO_SOLVE);

    const startGameHandler = (): void => {
        const newColors: TileColor[] = getColors(colorsCntVal);
        const grid: TileGrid = createGrid(rowsVal, columnsVal, newColors);
        newGame(grid, newColors);
    };

    const restartGameHandler = (): void => {
        if (initialGrid) {
            newGame(initialGrid, colors);
        }
    };

    return (
        <nav data-test="component-header-inputs" className="navbar d-block navbar-expand-lg navbar-light bg-light">
            <div className="d-flex w-100">
                <span className="navbar-brand flex-1">Tiles Color Game</span>
                <button className={"navbar-toggler" + (isNavBarCollapsed ? " collapsed" : "")} type="button"
                        data-test="navbar-collapse-btn"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded={isNavBarCollapsed}
                        aria-label="Toggle navigation"
                        onClick={() => setNavBarCollapsed(!isNavBarCollapsed)}
                >
                    <span className="navbar-toggler-icon"/>
                </button>
            </div>

            <div className={"collapse navbar-collapse" + (isNavBarCollapsed ? "" : " show")}
                 id="navbarSupportedContent">
                <div className="form-row w-100 align-items-end">
                    <div className="col-md-2">
                        <MinMaxSelect data-test="header-inputs-rows" min={minRows} max={maxRows} value={rowsVal}
                                      label={"Rows"}
                                      onChange={setRows}/>
                    </div>
                    <div className="col-md-2">
                        <MinMaxSelect data-test="header-inputs-columns" min={minColumns} max={maxColumns}
                                      value={columnsVal}
                                      label={"Columns"}
                                      onChange={setColumns}/>
                    </div>
                    <div className="col-md-2">
                        <MinMaxSelect data-test="header-inputs-colors" min={minColorsCnt} max={maxColorsCnt}
                                      value={colorsCntVal} label={"Colors"}
                                      onChange={setColorsCnt}/>
                    </div>

                    <div className="col-md-6">
                        <button data-test="new-game-button" type="button" className="btn btn-primary m-1 mb-3"
                                onClick={() => startGameHandler()} disabled={bDisabled}>New game
                        </button>

                        <button data-test="restart-game-button" type="button" className="btn btn-primary m-1 mb-3"
                                onClick={() => restartGameHandler()}
                                disabled={bDisabled || gameState === GameState.NOT_STARTED || !moves.length}>Restart
                            game
                        </button>
                        <button data-test="solve-next-move-button" type="button" className="btn btn-primary m-1 mb-3"
                                onClick={() => solveNextMove()}
                                disabled={bDisabled || gameState !== GameState.IN_PROGRESS}>Solve
                            next move
                        </button>
                        <button data-test="solve-game-button" type="button" className="btn btn-primary m-1 mb-3"
                                onClick={() => autoSolve()}
                                disabled={bDisabled || gameState !== GameState.IN_PROGRESS}>Solve game
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

const NavBar = connector(DisconnectedNavBar);

export default NavBar;
