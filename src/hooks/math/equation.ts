import { Equation, EquationResults } from "../../model"
import { get, post } from "../core"


export const getNewEquation = async (): Promise<Equation> => {
    const body = await get<Equation>("api/math");
    return body;
}


export const postEquationResult = async (equation: Equation, results: number): Promise<boolean> => {
    const body = await post<boolean>("api/math", {
        eq: equation,
        results: results
    } as EquationResults, {
        "Content-Type": "application/json"
    });
    return body;
}