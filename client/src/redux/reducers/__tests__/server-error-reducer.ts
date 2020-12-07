import {SERVER_ERROR} from "../../action-types";
import ServerErrorReducer from "../server-error-reducer";

test("returns default initial state of `false` when no action is passed", () => {
    const newState = ServerErrorReducer(undefined, {type: undefined});
    expect(newState).toBe(false);
});

test("returns state of `true` upon receiving an action of type `SERVER_ERROR`", () => {
    const newState = ServerErrorReducer(undefined, {type: SERVER_ERROR});
    expect(newState).toBe(true);
});
