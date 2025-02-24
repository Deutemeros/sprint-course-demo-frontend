export interface Field {
    id: number
    name: string
}

export interface MathFigure {
    id: number
    name: string
    url?: string
    field: Field[]
    description?: string
}