export interface Point2d {
    x: number;
    y: number;
}

export interface Line {
    start: Point2d;
    end: Point2d;
}

export const lerp = (A: number, B: number, t: number): number => {
    return A + (B - A) * t;
}
