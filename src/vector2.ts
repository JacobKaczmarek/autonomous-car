export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dot(other: Vector2): number {
       return this.x * other.y - this.y * other.x;
    }
}

