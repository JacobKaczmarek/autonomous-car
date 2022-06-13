import { lerp, Line, Point2d } from "./utils";

export class Road {
    x: number;
    width: number;
    laneCount: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    borders: Line[];

    constructor(x: number, width: number, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;

        const infinity = 100000;
        this.top = infinity;
        this.bottom = -infinity;

        this.borders = [
            {
                start: { x: this.left, y: this.top } as Point2d,
                end: { x: this.left, y: this.bottom } as Point2d
            } as Line,
            {
                start: { x: this.right, y: this.top } as Point2d,
                end: { x: this.right, y: this.bottom } as Point2d
            } as Line
        ]
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(this.left, this.right, i / this.laneCount);

            ctx.setLineDash([20, 20])
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach((border) => {
            ctx.beginPath();
            ctx.moveTo(border.start.x, border.start.y);
            ctx.lineTo(border.end.x, border.end.y);
            ctx.stroke();
        })
    }

    getLaneCenter(i: number) {
        const laneWidth = this.width / this.laneCount;

        return this.left + i * laneWidth + laneWidth / 2;
    }
}
