const VERTICAL_WALL = " | ";
const HORIZONTAL_WALL = " - ";
const FREE_SPACE = "   ";
const SNAKE_BODY = " * ";
const PLAYGROUND_SIZE = 10;

enum DIRECTIONS {
  LEFT,
  RIGHT,
  DOWN,
  UP,
}

const DIRECTIONS_ARR = [0, 1, 2, 3];

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

const is_available = (
  snake: Snake,
  posible_position: Array<number>
): boolean => {
  return snake.every(
    ([x, y]) => x != posible_position[0] || y != posible_position[1]
  );
};

let random_next_body_position = (): number => Math.round(Math.random() * 3);

let next_body_position = (
  snake: Snake,
  [px, py]: Array<number>,
  memory: Array<number>
): Array<number> => {
  let nextdirection = random_next_body_position();

  // picks another position if the function returns an old one
  while (memory.some((i) => i == nextdirection)) {
    nextdirection = random_next_body_position();
  }

  memory.push(nextdirection);

  switch (true) {
    case nextdirection == DIRECTIONS.UP:
      if (is_available(snake, [px, py - 1])) {
        return [px, py - 1];
      }
      return next_body_position(snake, [px, py], memory);
    case nextdirection == DIRECTIONS.DOWN:
      if (is_available(snake, [px, py + 1])) {
        return [px, py + 1];
      }
      return next_body_position(snake, [px, py], memory);
    case nextdirection == DIRECTIONS.LEFT:
      if (is_available(snake, [px - 1, py])) {
        return [px - 1, py];
      }
      return next_body_position(snake, [px, py], memory);

    case nextdirection == DIRECTIONS.RIGHT:
      if (is_available(snake, [px + 1, py])) {
        return [px + 1, py];
      }
      return next_body_position(snake, [px, py], memory);
    default:
      return next_body_position(snake, [px, py], memory);
  }
};

let goright = (snake: Snake, max: number) => {
  let [yp, xp] = snake[snake.length - 1];
  let min = 1;
  let next_x = xp + 1;
  if (next_x >= max) {
    next_x = next_x - max + min;
  }
  snake[snake.length - 1] = [yp, next_x];

  let previous = [yp, xp];

  for (let i = snake.length - 2; i >= 0; i--) {
    let temp = snake[i];
    snake[i] = previous;
    previous = temp;
  }
};

let goleft = (snake: Snake, max: number) => {
  let [yp, xp] = snake[snake.length - 1];
  let min = 1;
  let next_x = xp - 1;
  if (next_x <= 0) {
    next_x = next_x + max - min;
  }
  snake[snake.length - 1] = [yp, next_x];

  let previous = [yp, xp];

  for (let i = snake.length - 2; i >= 0; i--) {
    let temp = snake[i];
    snake[i] = previous;
    previous = temp;
  }
};

let goup = (snake: Snake, max: number) => {
  let [yp, xp] = snake[snake.length - 1];
  let min = 1;
  let next_y = yp - 1;
  if (next_y <= 0) {
    next_y = next_y + max - min;
  }
  snake[snake.length - 1] = [next_y, xp];

  let previous = [yp, xp];

  for (let i = snake.length - 2; i >= 0; i--) {
    let temp = snake[i];
    snake[i] = previous;
    previous = temp;
  }
};

let godown = (snake: Snake, max: number) => {
  let [yp, xp] = snake[snake.length - 1];
  let min = 1;
  let next_y = yp + 1;
  if (next_y <= 0) {
    next_y = next_y - max + min;
  }
  snake[snake.length - 1] = [next_y, xp];

  let previous = [yp, xp];

  for (let i = snake.length - 2; i >= 0; i--) {
    let temp = snake[i];
    snake[i] = previous;
    previous = temp;
  }
};

// starts the snake body
let startsnake = (max: number, size: number = 3): Snake => {
  let min = 1;
  let x = Math.round(Math.random() * (max - min + 1) + min);
  let y = Math.round(Math.random() * (max - min + 1) + min);

  let snake = [[x, y]];
  console.log(snake);

  for (let i = 0; i < size; i++) {
    snake.unshift(next_body_position(snake, snake[0], []));
  }

  return snake;
};

const in_snake = (snake: Snake, x: number, y: number): boolean =>
  snake.some(([xs, ys]) => xs == x && ys == y);

const printplayground = (snake: Snake, size: number) => {
  let playground: Array<Array<string>>;
  let ends = [0, size];
  let inx_snake = 0;

  for (let x = 0; x <= size; x++) {
    process.stdout.cursorTo(0, x);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    for (let y = 0; y <= size; y++) {
      if (inx_snake < snake.length && in_snake(snake, x, y)) {
        printProgress(SNAKE_BODY);
        inx_snake++;
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
      godown(snake, PLAYGROUND_SIZE);
      //   console.log(snake);
    }, speed);
  }
};

let snake = startsnake(PLAYGROUND_SIZE - 1);

startgame(snake, 500);
