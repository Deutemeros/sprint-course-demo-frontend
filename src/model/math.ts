export enum Operation {
    ADDITION = "ADDITION",
    SUBSTRACTION = "SUBSTRACTION",
    MULTIPLICATION = "MULTIPLICATION",
    DIVISION = "DIVISION",
    MODULO = "MODULO"
}

export interface Equation {
    result: number
    a: number
    b: number
    op: Operation
}

export interface EquationResults {
    eq: Equation
    results: number
}