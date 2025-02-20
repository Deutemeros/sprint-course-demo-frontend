import { Equation } from "../../model"
import { get, post } from "../core"


export const getNewEquation = async (): Promise<Equation> => {
    const body = await get<Equation>("api");
    return body;
}


export const postEquationResult = async (equation: Equation, result: number): Promise<boolean> => {
    const body = await post<boolean>("api", {
        eq: equation,
        result: result
    });
    return body;
}