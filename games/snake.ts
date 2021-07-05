const VERTICAL_WALL = " | ";
const HORIZONTAL_WALL = " - ";
const FREE_SPACE = "   ";
const SNAKE_BODY = " * ";
const PLAYGROUND_SIZE = 10;
const FRUIT = " @ ";

enum DIRECTIONS {
  LEFT,
  RIGHT,
  DOWN,
  UP,
}

enum ARROWS {
  UP = "\u001b[A",
  DOWN = "\u001b[B",
  RIGHT = "\u001b[C",
  LEFT = "\u001b[D",
}

const DIRECTIONS_ARR = [0, 1, 2, 3];

type Snake = Array<Array<number>>;

const random_range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

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
  if (next_y >= max) {
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

let eat_up = (ny: number, nx: number): Array<number> => {
  let min = 1;
  let next_y = ny - 1;
  if (next_y <= 0) {
    next_y = next_y + PLAYGROUND_SIZE - min;
  }
  return [next_y, nx];
};

let eat_down = (ny: number, nx: number): Array<number> => {
  let min = 1;
  let next_y = ny + 1;
  if (next_y >= PLAYGROUND_SIZE) {
    next_y = next_y - PLAYGROUND_SIZE + min;
  }
  return [next_y, nx];
};

let eat_left = (ny: number, nx: number): Array<number> => {
  let min = 1;
  let next_x = nx - 1;
  if (next_x <= 0) {
    next_x = next_x + PLAYGROUND_SIZE - min;
  }
  return [ny, next_x];
};

let eat_right = (ny: number, nx: number): Array<number> => {
  let min = 1;
  let next_x = nx + 1;
  if (next_x >= PLAYGROUND_SIZE) {
    next_x = next_x - PLAYGROUND_SIZE + min;
  }
  return [ny, next_x];
};

// starts the snake body
let startsnake = (max: number, size: number = 3): Snake => {
  let min = 1;
  let x = random_range(min, max);
  let y = random_range(min, max);

  let snake = [[x, y]];

  for (let i = 0; i < size; i++) {
    snake.unshift(next_body_position(snake, snake[0], []));
  }

  return snake;
};

const in_snake = (snake: Snake, x: number, y: number): boolean =>
  snake.some(([xs, ys]) => xs == x && ys == y);

const is_fruit = ([xf, yf]: Array<number>, x: number, y: number): boolean =>
  xf == x && yf == y;

const get_fruit = (snake: Snake, max: number = PLAYGROUND_SIZE - 1) => {
  let min = 1;
  let x = random_range(min, max);
  let y = random_range(min, max);

  while (!in_snake(snake, x, y)) {
    x = random_range(min, max);
    y = random_range(min, max);
  }
  return [x, y];
};

const check_collision = (
  snake: Snake,
  fruit: Array<number>,
  current_direction: ARROWS,
  cb: Function
) => {
  let [y_head, x_head] = snake[snake.length - 1];
  let [yf, xf] = fruit;
  if (x_head == xf && y_head == yf) {
    switch (current_direction) {
      case ARROWS.UP:
        snake.push(eat_up(y_head, x_head));
        break;
      case ARROWS.DOWN:
        snake.push(eat_down(y_head, x_head));
        break;
      case ARROWS.LEFT:
        snake.push(eat_left(y_head, x_head));
        break;
      case ARROWS.RIGHT:
        snake.push(eat_right(y_head, x_head));
        break;
    }
    let [xfn, yfn] = get_fruit(snake);
    fruit[0] = yfn;
    fruit[1] = xfn;
  }
  if (
    in_snake(
      snake.slice(0, snake.length - 2),
      snake[snake.length - 1][0],
      snake[snake.length - 1][1]
    )
  ) {
    cb();
  }
};

const printplayground = (snake: Snake, fruit: Array<number>, size: number) => {
  let playground: Array<Array<string>>;
  let ends = [0, size];
  let inx_snake = 0;

  for (let x = 0; x <= size; x++) {
    process.stdout.cursorTo(0, x);
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    for (let y = 0; y <= size; y++) {
      if (is_fruit(fruit, x, y)) {
        printProgress(FRUIT);
        continue;
      }
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

const startgame = (
  snake: Snake,
  fruit: Array<number>,
  speed: number = 1000
) => {
  let index = 0;
  let stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  updategame();
  let update_direction = goright;
  function updategame() {
    let current_direction = ARROWS.RIGHT;

    stdin.on("data", (key: string) => {
      if (key === "\u0003") {
        process.exit();
      }

      switch (key) {
        //up
        case ARROWS.UP:
          if (current_direction != ARROWS.DOWN) {
            update_direction = goup;
            current_direction = ARROWS.UP;
          }
          break;
        //down
        case ARROWS.RIGHT:
          if (current_direction != ARROWS.LEFT) {
            update_direction = goright;
            current_direction = ARROWS.RIGHT;
          }
          break;
        //right
        case ARROWS.DOWN:
          if (current_direction != ARROWS.UP) {
            update_direction = godown;
            current_direction = ARROWS.DOWN;
          }
          break;
        //left
        case ARROWS.LEFT:
          if (current_direction != ARROWS.RIGHT) {
            update_direction = goleft;
            current_direction = ARROWS.LEFT;
          }
          break;
        default:
          break;
      }
    });

    let interval = setInterval(() => {
        // log the positions
    //   console.log(fruit);
    //   console.log(snake);

      printplayground(snake, fruit, PLAYGROUND_SIZE);
      check_collision(snake, fruit, current_direction, () => {
        console.log("Game over");

        clearInterval(interval);
      });
      update_direction(snake, PLAYGROUND_SIZE);
    }, speed);
  }
};

let snake = startsnake(PLAYGROUND_SIZE - 1, 2);
let fruit = get_fruit(snake);

startgame(snake, fruit, 100);
