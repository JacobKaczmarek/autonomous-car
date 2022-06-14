import { Car } from "./car"
import { lerp, Line, Reading, getIntersection } from "./utils";
import { Vector2 } from "./vector2"

export class Senesor {
    car: Car;
    rayCount: number;
    rayLength: number;
    raySpread: number;
    rays: Line[];
    readings: Reading[];

    constructor(car: Car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 200;
        this.raySpread = Math.PI / 2;

        this.rays = [];
        this.readings = [];
    }

    private castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                -this.raySpread / 2,
                this.raySpread / 2,
                this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
            ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y } as Vector2;
            const end = {
                x: this.car.x - this.rayLength * Math.sin(rayAngle),
                y: this.car.y - this.rayLength * Math.cos(rayAngle)
            } as Vector2;

            this.rays.push({ start, end } as Line);
        }

    }

    private getReadings(ray: Line, borders: Line[]) {
        let touches = [] as any[];

        borders.forEach((border) => {
            const touch = getIntersection(ray, border);

            if (touch) {
                touches.push(touch);
            }
        })
        
        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(t => t.offset);
            const minOffset = Math.min(...offsets);

            return touches.find(t => t.offset === minOffset);
        }
    }

    update(borders: Line[]) {
        this.castRays();
        this.readings = [];

        this.rays.forEach(ray => {
            this.readings.push(this.getReadings(ray, borders));
        })
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.rays.forEach((ray) => {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(ray.start.x, ray.start.y);
            ctx.lineTo(ray.end.x, ray.end.y);
            ctx.stroke();
        });
    }

}
