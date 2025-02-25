import { MathFigure, MathFigureInput } from "../../model"
import { del, get, post } from "../core";

export const getAllFigures = async (): Promise<MathFigure[]> => {
    const body = await get<MathFigure[]>("api/mathfigure");
    return body;
}

export const getFigureByID = async (id: number | string): Promise<MathFigure | undefined> => {
    const body = await get<MathFigure>(`api/mathfigure/${id}`);
    return body;
}

export const createFigure = async (figure: MathFigureInput): Promise<MathFigure> => {
    const body = await post<MathFigure>(`api/mathfigure`, figure, {
        "Content-Type": "application/json"
    });
    return body;
}

export const updateFigure = async (figure: MathFigureInput): Promise<MathFigure> => {
    if (figure.id === undefined) {
        return Promise.reject("missing ID");
    }
    const body = await post<MathFigure>(`api/mathfigure/${figure.id}`, figure, {
        "Content-Type": "application/json"
    });
    return body;
}

export const deleteFigure = async (id: number | string): Promise<undefined> => {
    await del<MathFigure>(`api/mathfigure/${id}`);
    return undefined;
}