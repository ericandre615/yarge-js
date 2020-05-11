import createApp from '../src/app.js';
import createTriangle from '../src/create-triangle.js';
import createQuad from '../src/create-quad.js';
import createSprite from '../src/lib/sprite.js';
import { rgba } from '../src/lib/color.js';
import createCamera from '../src/lib/camera.js';
import createTexture from '../src/lib/texture.js';

const UP = 38;
const RIGHT = 39;
const LEFT = 37;
const DOWN = 40;
const TAB = 9;
const PAUSE = 80;

const updateCamera = camera => e => {
  if (e.keyCode !== TAB) {
    e.preventDefault();
  }
  const [x, y] = camera.getPosition();
  const vel = 10;

  if (e.keyCode === UP) {
    camera.setPosition(x, y - vel);
  }

  if (e.keyCode === DOWN) {
    camera.setPosition(x, y + vel);
  }

  if (e.keyCode === RIGHT) {
    camera.setPosition(x + vel, y);
  }

  if (e.keyCode === LEFT) {
    camera.setPosition(x - vel, y);
  }
}

// just testing
const setup = async () => {
  console.log('RUNNING APP');
  const glCanvas = document.getElementById('webgl-canvas');
  const gl = glCanvas.getContext('webgl');

  const camera = createCamera(glCanvas.width, glCanvas.height);
  const texture = createTexture(gl);
  const sprite = createSprite(gl);

  const triangle = createTriangle(gl)([], rgba(0, 0, 255, 255));
  const quad = createQuad(gl)({
    position: [glCanvas.width / 2, 20.0, 0.0],
    color: rgba(0, 255, 0, 255),
    width: 120,
    height: 80,
  });
  const ninjaTexture = await texture('./assets/images/ninja-gaiden.gif');
  const marioSprite = await sprite({
    position: [20.0, 20.0],
    color: rgba(255, 155, 55, 155),
    width: 420,
    height: 420,
    imagePath: './assets/images/mario-sprite.png',
  });
  const ninjaSprite = await sprite({
    position: [40.0, 120.0],
    color: rgba(255, 255, 255, 255),
    width: 256,
    height: 256,
    texture: ninjaTexture
  });

  const app = createApp('webgl-canvas');
  app.state.setClearColor(0.8, 0.0, 0.0, 1.0);

  app.run({
    update: (state) => {
      triangle.render();
      quad.render(camera);
      marioSprite.render(camera);
      ninjaSprite.render(camera);
    },
  });

  document.addEventListener('keydown', updateCamera(camera), false);
}

setup();
