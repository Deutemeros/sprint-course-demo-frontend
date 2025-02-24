import { Field, MathFigure } from "../../model"
import { del, get, post } from "../core";

export const getAllFields = async (): Promise<Field[]> => {
    const body = await get<Field[]>("api/field");
    console.log(body);
    return body;
}

export const getFieldByID = async (id: number): Promise<Field | undefined> => {
    const body = await get<Field>(`api/field/${id}`);
    console.log(body);
    return body;
}

export const getFigureByFieldID = async (id: number): Promise<MathFigure[] | undefined> => {
    const body = await get<MathFigure[]>(`api/field/${id}/mathfigure`);
    console.log(body);
    return body;
}

export const createField = async (figure: Field): Promise<Field> => {
    const body = await post<Field>(`api/field`, figure);
    console.log(body);
    return body;
}

export const updateField = async (figure: Field): Promise<Field> => {
    if (figure.id === undefined) {
        return Promise.reject("missing ID");
    }
    const body = await post<Field>(`api/field/${figure.id}`, figure);
    console.log(body);
    return body;
}

export const deleteField = async (id: number): Promise<undefined> => {
    const body = await del<Field>(`api/field/${id}`);
    console.log(body);
    return undefined;
}