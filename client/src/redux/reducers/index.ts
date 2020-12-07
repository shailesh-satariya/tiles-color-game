import {combineReducers} from "redux";
import AiMovesReducer from "./ai-moves-reducer";
import ColorsReducer from "./colors-reducer";
import GameStateReducer from "./game-state-reducer";
import GridReducer from "./grid-reducer";
import InitialGridReducer from "./initial-grid-reducer";
import MovesReducer from "./moves-reducer";
import NextMoveReducer from "./next-move-reducer";
import ServerErrorReducer from "./server-error-reducer";

export default combineReducers({
    aiMoves: AiMovesReducer,
    colors: ColorsReducer,
    gameState: GameStateReducer,
    grid: GridReducer,
    initialGrid: InitialGridReducer,
    moves: MovesReducer,
    nextMove: NextMoveReducer,
    serverError: ServerErrorReducer
});
