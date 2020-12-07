import {GameState} from "common";
import React, {MutableRefObject, useRef} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ColorPicker, GameGrid, GameHistory} from "../components";
import {solveGame} from "../redux/actions";
import {RootState} from "../redux/store";

const mapStateToProps = ({initialGrid, grid, gameState, moves, aiMoves}: RootState) => ({
    initialGrid, grid, gameState, moves, aiMoves
});

const connector = connect(mapStateToProps, {solveGame});

export type GameProps = ConnectedProps<typeof connector>;

/**
 * DisconnectedGame component - renders game board, color pickers
 * @function DisconnectedGame
 *
 * @param {GameProps} props
 * @constructor
 *
 * {JSX.Element | null}
 */
export const DisconnectedGame = (props: GameProps): JSX.Element | null => {
    const {initialGrid, grid, gameState, moves, aiMoves, solveGame}: GameProps = props;
    const alertRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const historyRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const bSolved: boolean = gameState === GameState.SOLVED;
    React.useEffect(() => {
        setTimeout(() => {
            if (alertRef.current && bSolved) {
                alertRef.current.scrollIntoView({behavior: "smooth"});
            }

            if (historyRef.current && aiMoves) {
                historyRef.current.scrollIntoView({behavior: "smooth"});
            }

        });
    }, [bSolved, aiMoves])

    if (!grid) {
        return null;
    }

    return (
        <div data-test="component-game" className="game">
            <div className="row">
                <div className="col-lg-8 d-flex justify-content-center main-game-board">
                    <GameGrid data-test="game-grid" grid={grid}/>
                </div>
                <div className="col-lg-4 d-flex flex-1 flex-column text-center justify-content-center align-self-start">
                    <ColorPicker data-test="color-picker"/>
                    <h5 className="border-1 m-2"><b>Moves:</b>&nbsp;<span data-test="moves-cnt">{moves.length}</span>
                    </h5>
                </div>
            </div>
            {bSolved ?
                <div ref={alertRef} className="alert alert-success text-center mb-3 mt-3">
                    <h5 data-test="success-alert">Congrats! You have solved this game.</h5>
                    <button data-test="solve-game-button" className="btn btn-primary" onClick={() => solveGame()}>
                        Compare with automated
                    </button>
                </div> : null}

            {
                bSolved && aiMoves && initialGrid ?
                    <div ref={historyRef}>
                        <div className="d-flex text-center">
                            <div className="flex-1">
                                <b data-test="your-history-label">
                                    Yours<br/>(Moves: <span data-test="your-history-move-count">{moves.length}</span>)
                                </b>
                            </div>
                            <div className="flex-1">
                                <b data-test="ai-history-label">
                                    Automated<br/>(Moves: <span
                                    data-test="ai-history-move-count">{aiMoves.length}</span>)</b>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="flex-1 p-2">

                                <GameHistory data-test="your-history" grid={initialGrid} moves={moves}/>
                            </div>
                            <div className="flex-1 p-2">

                                <GameHistory data-test="ai-history" grid={initialGrid} moves={aiMoves}/>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    );
}

const Game = connector(DisconnectedGame);

export default Game;
