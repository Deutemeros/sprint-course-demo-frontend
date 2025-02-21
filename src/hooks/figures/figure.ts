import { MathFigure } from "../../model"
import { del, get, post } from "../core";

export const getAllFigures = async (): Promise<MathFigure[]> => {
    const body = await get<MathFigure[]>("api/mathfigure");
    console.log(body);
    return body;
}

export const getFigureByID = async (id: number): Promise<MathFigure | undefined> => {
    const body = await get<MathFigure>(`api/mathfigure/${id}`);
    console.log(body);
    return body;
}

export const createFigure = async (figure: MathFigure): Promise<MathFigure> => {
    const body = await post<MathFigure>(`api/mathfigure`, figure);
    console.log(body);
    return body;
}

export const updateFigure = async (figure: MathFigure): Promise<MathFigure> => {
    if (figure.id === undefined) {
        return Promise.reject("missing ID");
    }
    const body = await post<MathFigure>(`api/mathfigure/${figure.id}`, figure);
    console.log(body);
    return body;
}

export const deleteFigure = async (id: number): Promise<undefined> => {
    const body = await del<MathFigure>(`api/mathfigure/${id}`);
    console.log(body);
    return undefined;
}