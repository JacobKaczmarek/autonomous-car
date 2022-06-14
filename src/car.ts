import { Controls } from "./controls";
import { Senesor } from "./sensor";
import { Line } from "./utils";

export class Car {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;

    speed: number;
    maxSpeed: number;
    acceleration: number;
    turningSpeed: number;

    friction: number;
    controls: Controls;
    sensor: Senesor;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;

        this.speed = 0;
        this.maxSpeed = 2;
        this.acceleration = 0.2;
        this.turningSpeed = 0.03;
        
        this.friction = 0.05;
        this.controls = new Controls();
        this.sensor = new Senesor(this);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.translate(this.x, this.y)
        ctx.rotate(-this.angle)

        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fill();
        ctx.restore();

        this.sensor.draw(ctx);
    }

    private move() {
        if (this.controls.forward) this.speed += this.acceleration;
        if (this.controls.reverse) this.speed -= this.acceleration;

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) this.angle += this.turningSpeed * flip;
            if (this.controls.right) this.angle -= this.turningSpeed * flip;
        }

        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        else if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2
        if (Math.abs(this.speed) < this.friction) this.speed = 0;

        if (this.speed > 0) this.speed -= this.friction;
        else if (this.speed < 0) this.speed += this.friction;


        this.y -= this.speed * Math.cos(this.angle);
        this.x -= this.speed * Math.sin(this.angle);
    }

    update(borders: Line[]) {
        this.move();
        this.sensor.update(borders);
    }
}
