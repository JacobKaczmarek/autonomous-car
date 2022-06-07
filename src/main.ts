import { Car } from "./car";
import './style.css'

const canvas = document.getElementById<HTMLDivElement>('canvas');
canvas.width = 400;

const ctx = canvas.getContext('2d');

const car = new Car(200, 500, 40, 100)

const loop = () => {
  canvas.height = window.innerHeight;
  car.update()
  car.draw(ctx)

  requestAnimationFrame(loop)
}

loop()
