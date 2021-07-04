const VERTICAL_WALL = " | ";
const HORIZONTAL_WALL = " - ";
const FREE_SPACE = "   ";
const SNAKE_BODY = " * ";
const PLAYGROUND_SIZE = 10;

type Snake = Array<Array<number>>;

const iscorner = (y: number, x: number, size: number): boolean => {
  switch (true) {
    case y == 0 && x == 0:
      return true;
    case y == 0 && x == size:
      return true;
    case y == size && x == size:
      return true;
    case y == size && x == 0:
      return true;
    default:
      return false;
  }
};

let goright = (snake: Snake, max: number) => {
  let [yp, xp] = snake[0];
  let min = 1;
  let next_x = xp + 1;
  if (next_x >= max) {
    next_x = next_x - max + min;
  }
  snake[0] = [yp, next_x];
};

let startsnake = (max: number): Snake => {
  let min = 1;
  let x = Math.round(Math.random() * (max - min + 1) + min);
  let y = Math.round(Math.random() * (max - min + 1) + min);
  return [[x, y]];
};

const is_snake = (snake: Snake, index: number, x: number, y: number): boolean =>
  snake[index][0] == x && snake[index][1] == y;

const printplayground = (snake: Snake, size: number) => {
  let playground: Array<Array<string>>;
  let ends = [0, size];
  let inx_snake = 0;

  for (let y = 0; y <= size; y++) {
    process.stdout.cursorTo(0, y);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    for (let x = 0; x <= size; x++) {
      if (is_snake(snake, inx_snake, x, y)) {
        printProgress(SNAKE_BODY);
        continue;
      }
      if (ends.includes(x) && !iscorner(y, x, size)) {
        printProgress(HORIZONTAL_WALL);
      } else if (ends.includes(y) && !iscorner(y, x, size)) {
        printProgress(VERTICAL_WALL);
      } else {
        printProgress(FREE_SPACE);
      }
    }
    console.log("\n");
  }
};

function printProgress(content: string) {
  process.stdout.write(content);
}

const startgame = (snake: Snake, speed: number = 1000) => {
  let index = 0;
  updategame();

  function updategame() {
    let interval = setInterval(() => {
      printplayground(snake, PLAYGROUND_SIZE);
      goright(snake, PLAYGROUND_SIZE);
    }, speed);
  }
};

let snake = startsnake(PLAYGROUND_SIZE - 1);

startgame(snake,500);
