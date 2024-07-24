// Inspired by Slackmanz - Multiple Neighborhood Cellular Automata (MNCA)
// https://slackermanz.com/understanding-multiple-neighborhood-cellular-automata/

// Global variables
const DEAD = 0;
const ALIVE = 1;
const n = 600;
const brushThickness = 100;
let cells;
let g;
let STYLE = 0;
let scale, offsetX, offsetY;

// Conditions for cell state changes
const conditions = {
  0: (status, hood0, hood1) => {
    return status ? hood0 < 19 : hood0 * 2.6 > hood1;
  },
  1: (status, hood0, hood1) => {
    return status ? hood0 < 19 && hood1 < 36 : hood0 * 2.6 > hood1;
  },
  2: (status, hood0, hood1) => {
    return status ? hood0 != hood1 : hood0 * 2.6 > hood1;
  },
};

function setup() {
  p5.disableFriendlyErrors = true;
  createCanvas(windowWidth, windowHeight);
  
  cells = new Uint8Array(n * n).fill(DEAD);
  g = createGraphics(n, n);
  g.background(0).pixelDensity(1).loadPixels();
  
  calculateScaleAndOffset();
}

function calculateScaleAndOffset() {
  scale = min(windowWidth / n, windowHeight / n);
  offsetX = (windowWidth - n * scale) / 2;
  offsetY = (windowHeight - n * scale) / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScaleAndOffset();
}

function draw() {
  background("white");

  const mx = int(constrain((mouseX - offsetX) / scale, 0, n - 1));
  const my = int(constrain((mouseY - offsetY) / scale, 0, n - 1));

  if (mouseIsPressed) {
    const b = brushThickness;
    for (let dy = -b; dy <= b; dy++) {
      for (let dx = -b; dx <= b; dx++) {
        let d = sqrt(dx ** 2 + dy ** 2);
        if (d > b) continue;
        let x = mx + dx;
        let y = my + dy;
        if (x < 0 || x >= n || y < 0 || y >= n) continue;
        cells[x + y * n] = random(5000) < 1 && b - d < 1 ? ALIVE : DEAD;
      }
    }
  }

  const getNextState = conditions[STYLE];
  let next = new Uint8Array(cells);
  for (let y = 4; y < n - 4; y++) {
    for (let x = 4; x < n - 4; x++) {
      const i = x + y * n;

      const hood0 =
        cells[i + 1] +
        cells[i - 1] +
        cells[i - n] +
        cells[i + n] +
        cells[i - 1 - n] +
        cells[i - 1 + n] +
        cells[i + 1 - n] +
        cells[i + 1 + n] +
        cells[i + 2] +
        cells[i + 2 + n] +
        cells[i + 2 - n] +
        cells[i - 2] +
        cells[i - 2 + n] +
        cells[i - 2 - n] +
        cells[i + 2 * n] +
        cells[i + 2 * n - 1] +
        cells[i + 2 * n + 1] +
        cells[i - 2 * n] +
        cells[i - 2 * n + 1] +
        cells[i - 2 * n - 1];

      const hood1 =
        cells[i + 1] +
        cells[i + 2] +
        cells[i + 3] +
        cells[i + 4] +
        cells[i - 1] +
        cells[i - 2] +
        cells[i - 3] +
        cells[i - 4] +
        cells[i - n] +
        cells[i - 2 * n] +
        cells[i - 3 * n] +
        cells[i - 4 * n] +
        cells[i + n] +
        cells[i + 2 * n] +
        cells[i + 3 * n] +
        cells[i + 4 * n] +
        cells[i - n + 1] +
        cells[i - n + 2] +
        cells[i - n + 3] +
        cells[i - n + 4] +
        cells[i - 2 * n + 1] +
        cells[i - 2 * n + 2] +
        cells[i - 2 * n + 3] +
        cells[i - 3 * n + 1] +
        cells[i - 3 * n + 2] +
        cells[i - 4 * n + 1] +
        cells[i + n + 1] +
        cells[i + n + 2] +
        cells[i + n + 3] +
        cells[i + n + 4] +
        cells[i + 2 * n + 1] +
        cells[i + 2 * n + 2] +
        cells[i + 2 * n + 3] +
        cells[i + 3 * n + 1] +
        cells[i + 3 * n + 2] +
        cells[i + 4 * n + 1] +
        cells[i - n - 1] +
        cells[i - n - 2] +
        cells[i - n - 3] +
        cells[i - n - 4] +
        cells[i - 2 * n - 1] +
        cells[i - 2 * n - 2] +
        cells[i - 2 * n - 3] +
        cells[i - 3 * n - 1] +
        cells[i - 3 * n - 2] +
        cells[i - 4 * n - 1] +
        cells[i + n - 1] +
        cells[i + n - 2] +
        cells[i + n - 3] +
        cells[i + n - 4] +
        cells[i + 2 * n - 1] +
        cells[i + 2 * n - 2] +
        cells[i + 2 * n - 3] +
        cells[i + 3 * n - 1] +
        cells[i + 3 * n - 2] +
        cells[i + 4 * n - 1];

      state = getNextState(cells[i], hood0, hood1);
      next[i] = state;
      g.pixels[i * 4 + 3] = state ? 255 : 0;
    }
  }
  cells = next;
  g.updatePixels();
  image(g, offsetX, offsetY, n * scale, n * scale);
}

function keyPressed() {
  if (key === '0' || key === '1' || key === '2') {
    STYLE = parseInt(key);
  }
}