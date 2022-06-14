import { Vector2 } from "./vector2"

export interface Line {
    start: Vector2;
    end: Vector2;
}

export interface Reading {
    x: number;
    y: number;
    offset: number;
}

export const getIntersection = (A: Line, B: Line): Reading | null => {
    return { x: 0, y: 0, offset: 0 };
}

export const lerp = (A: number, B: number, t: number): number => {
    return A + (B - A) * t;
}
