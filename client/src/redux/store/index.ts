import {applyMiddleware, createStore} from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers";

export const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export default store;
