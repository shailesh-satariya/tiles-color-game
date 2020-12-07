import {TileColor, TileGrid} from "common";
import moxios from "moxios";
import {Store} from "redux";
import {solveGame, solveNextMove} from "../";

import {DefaultState, storeFactory} from "../../../test/utils";
import {GameActions} from "../../action-types";
import {RootState} from "../../store";

const grid: TileGrid = [
    [
        {color: TileColor.COLOR3, traversed: true}, {
        color: TileColor.COLOR1,
        traversed: false
    }, {color: TileColor.COLOR2, traversed: false}
    ],
    [
        {color: TileColor.COLOR4, traversed: false}, {
        color: TileColor.COLOR1,
        traversed: false
    }, {color: TileColor.COLOR4, traversed: false}
    ],
    [
        {color: TileColor.COLOR1, traversed: false}, {
        color: TileColor.COLOR2,
        traversed: false
    }, {color: TileColor.COLOR2, traversed: false}
    ]
];

describe("solveGame action creator", () => {
    let store: Store<RootState, GameActions>;

    beforeEach(() => {
        moxios.install();
        store = storeFactory({...DefaultState, initialGrid: grid});
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("adds response aiMoves to state", () => {
        const colors: TileColor[] = [TileColor.COLOR1, TileColor.COLOR2, TileColor.COLOR4, TileColor.COLOR1];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {colors},
            });
        });

        return store.dispatch<any>(solveGame())
            .then(() => {
                const newState = store.getState();
                expect(newState.aiMoves).toEqual(colors);
            });
    });

    describe("updates serverError state to `true`", () => {
        // NOTE: there's currently no way to simulate server nonresponse with moxios
        test("when server returns 4xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 404,
                });
            });

            // @ts-ignore
            return store.dispatch(solveGame())
                // @ts-ignore
                .then(() => {
                    const newState = store.getState();
                    expect(newState.serverError).toBe(true);
                });
        });

        test("when server returns 5xx status", () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 500,
                });
            });

            return store.dispatch<any>(solveGame())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.serverError).toBe(true);
                });
        });
    })
});

describe("solveGame action creator", () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test("adds response nextMove to state", () => {
        const store: Store<RootState, GameActions> = storeFactory({...DefaultState, grid});
        const color: TileColor = TileColor.COLOR1;
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {color},
            });
        });

        return store.dispatch<any>(solveNextMove())
            .then(() => {
                const newState = store.getState();
                expect(newState.nextMove).toEqual(color);
            });
    });
});
