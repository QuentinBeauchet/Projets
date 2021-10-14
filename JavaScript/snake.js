const width = getComputedStyle(document.body).getPropertyValue("--width");
const height = getComputedStyle(document.body).getPropertyValue("--height");

var running;
var style_fruit;
var lastKey;
var snake;

function init() {
  running = true;
  document.getElementById("resultat").style.display = "none";
  lastKey = "ArrowUp";
  var innerHTML = [];
  for (let index = 0; index < width * height; index++) {
    innerHTML.push('<span class="case" id="c' + index + '"></span>');
  }
  document.getElementById("cases").innerHTML = innerHTML.join("");

  snake = {
    head: {
      x: randomNumber(width - 1),
      y: randomNumber(height - 1),
    },
    body: [],
  };

  updateSnake(lastKey);
  addFruit();
  loop();
}

function end() {
  document.getElementById("res").innerHTML =
    "Votre score est de " + (snake.body.length - 1) + ".";
  document.getElementById("resultat").style.display = "flex";
  running = false;
}

function randomNumber(max) {
  if (snake != undefined && snake.body.length >= width * height) {
    end();
  } else {
    var id;
    var date = Date.now();
    do {
      id = Math.floor(Math.random() * max);
    } while (
      " " +
        getComputedStyle(document.getElementById("c" + id)).backgroundColor !=
        getComputedStyle(document.body).getPropertyValue("--empty") &&
      Date.now() - date > 2000
    );
    return id;
  }
}

function getHeadId() {
  return "c" + (snake.head.x + snake.head.y * height);
}

function updateSnake(key) {
  const oldHeadId = getHeadId();
  switch (key) {
    case "ArrowUp": {
      snake.head.y--;
      break;
    }
    case "ArrowDown": {
      snake.head.y++;
      break;
    }
    case "ArrowLeft": {
      snake.head.x--;
      break;
    }
    case "ArrowRight": {
      snake.head.x++;
      break;
    }
    default:
      return;
  }
  snake.body.push(oldHeadId);
  const newHeadId = getHeadId();
  const bgNewHeadId =
    document.getElementById(newHeadId) == undefined
      ? undefined
      : " " +
        getComputedStyle(document.getElementById(newHeadId)).backgroundColor;
  if (
    snake.head.x > width - 1 ||
    snake.head.y > height - 1 ||
    snake.head.x < 0 ||
    snake.head.y < 0 ||
    (bgNewHeadId !=
      getComputedStyle(document.body).getPropertyValue("--empty") &&
      bgNewHeadId !=
        getComputedStyle(document.body).getPropertyValue("--fruit"))
  ) {
    end();
    return;
  }

  document.getElementById(newHeadId).style.backgroundColor = getComputedStyle(
    document.body
  ).getPropertyValue("--snake_head");
  document.getElementById(oldHeadId).style.backgroundColor = getComputedStyle(
    document.body
  ).getPropertyValue("--snake_body");
  if (
    bgNewHeadId != getComputedStyle(document.body).getPropertyValue("--fruit")
  ) {
    document.getElementById(snake.body.shift()).style.backgroundColor =
      getComputedStyle(document.body).getPropertyValue("--empty");
  } else {
    style_fruit.borderRadius = "0px";
    addFruit();
  }
}

function addFruit() {
  style_fruit = document.getElementById(
    "c" + randomNumber(height * width)
  ).style;
  style_fruit.backgroundColor = getComputedStyle(
    document.body
  ).getPropertyValue("--fruit");
  style_fruit.borderRadius = "100px";
}

document.addEventListener("keydown", (event) => {
  if (running) {
    lastKey =
      {
        ArrowUp: "ArrowUp",
        z: "ArrowUp",
        ArrowDown: "ArrowDown",
        s: "ArrowDown",
        ArrowLeft: "ArrowLeft",
        q: "ArrowLeft",
        ArrowRight: "ArrowRight",
        d: "ArrowRight",
      }[event.key] || lastKey;
  }
});

document.getElementById("restart").addEventListener("click", () => {
  init();
});

function loop() {
  if (running) {
    updateSnake(lastKey);
    window.setTimeout(loop, Math.max(40, 300 - snake.body.length * 25));
  }
}

init();
