import { Field } from "../../model"
import { del, get, post } from "../core";

export const getAllFigures = async (): Promise<Field[]> => {
    const body = await get<Field[]>("api/field");
    console.log(body);
    return body;
}

export const getFigureByID = async (id: number): Promise<Field | undefined> => {
    const body = await get<Field>(`api/field/${id}`);
    console.log(body);
    return body;
}

export const createFigure = async (figure: Field): Promise<Field> => {
    const body = await post<Field>(`api/field`, figure);
    console.log(body);
    return body;
}

export const updateFigure = async (figure: Field): Promise<Field> => {
    if (figure.id === undefined) {
        return Promise.reject("missing ID");
    }
    const body = await post<Field>(`api/field/${figure.id}`, figure);
    console.log(body);
    return body;
}

export const deleteFigure = async (id: number): Promise<undefined> => {
    const body = await del<Field>(`api/field/${id}`);
    console.log(body);
    return undefined;
}