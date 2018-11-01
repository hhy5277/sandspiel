import { Cell, Species, Universe } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./ui";
import { startFluid } from "./fluid";
import { ratio } from "./constants";
const ui = document.getElementById("ui");

let screen_width = window.innerWidth / ratio;
let uiheight = ui.offsetHeight;
let screen_height = (window.innerHeight - uiheight) / ratio;

// let pixels = screen_width * screen_height;

// Construct the universe, and get its width and height.

const universe = Universe.new(screen_width, screen_height);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("sand-canvas");
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;

let fluid_update = startFluid({ universe });

const renderLoop = () => {
  fps.render(); // new
  universe.tick();
  fluid_update();
  window.animationId = requestAnimationFrame(renderLoop);
};

startWebGL({ canvas, universe });
renderLoop();
export { renderLoop, canvas, width, height, universe, ratio };
