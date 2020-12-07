import {GameState} from "common";
import React from "react";
import {connect, ConnectedProps} from "react-redux";

import "./App.css";
import {NavBar, ToastMessage} from "./components";

import {Game} from "./pages";
import {setNoServerError} from "./redux/actions";

import {RootState} from "./redux/store";

const mapStateToProps = ({gameState, serverError}: RootState) => ({
    gameState, serverError
});

const connector = connect(mapStateToProps, {setNoServerError});

export type AppProps = ConnectedProps<typeof connector>;

/**
 * App component
 * @function DisconnectedApp
 *
 * @param {AppProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
export const DisconnectedApp = (props: AppProps): JSX.Element => {
    const {gameState, serverError, setNoServerError}: AppProps = props;

    return (
        <div data-test="component-app">

            {serverError ?
                <ToastMessage data-test="toast-message" header="Error!" body="Server error!"
                              onClose={setNoServerError}/>
                : null}
            <NavBar data-test="header-inputs"/>
            {(gameState !== GameState.NOT_STARTED) ?
                <div className="container p-4"><Game data-test="game"/></div> : null}
        </div>
    );
}

const App = connector(DisconnectedApp);

export default App;
