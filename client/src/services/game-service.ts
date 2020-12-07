import axios, {AxiosResponse} from "axios";
import {convertGridToNumberedArray, TileGrid} from "common";

const apiUrl: string = process.env.REACT_APP_API_URL as string;

export const solveGame = (grid: TileGrid): Promise<AxiosResponse> => {
    return axios.post(`${apiUrl}/solve-game`, {
        grid: convertGridToNumberedArray(grid)
    })
}

export const solveNextMove = (grid: TileGrid): Promise<AxiosResponse> => {
    return axios.post(`${apiUrl}/solve-next-move`, {
        grid: convertGridToNumberedArray(grid)
    })
}
