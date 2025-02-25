export interface Field {
    id: number | string
    name: string
}

export interface MathFigure {
    id: number | string
    name: string
    url?: string
    field: Field
    description?: string
}

export interface MathFigureInput {
    id?: number | string
    name: string
    url?: string
    fieldId: number
    description?: string
}