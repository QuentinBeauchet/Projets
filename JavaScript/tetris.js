var canvas = document.getElementById("grille");
var canvas_next = document.getElementById("next_block");
var ctx = canvas.getContext("2d");

const baseUnit = 35;

var speed = 1000;
var score = 0;

var map = Array(canvas.clientHeight / baseUnit)
  .fill()
  .map(() => Array(canvas.clientWidth / baseUnit).fill(0));

var colors = [
  "#5A65AD",
  "#F17922",
  "#F5D507",
  "#40B73F",
  "#7FBFE7",
  "#7F633A",
  "#CD04FF",
];

var formes = {
  I: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 2],
  ],
  L: [
    [0, 0, 0],
    [3, 3, 3],
    [3, 0, 0],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  S: [
    [0, 0, 0],
    [0, 5, 5],
    [5, 5, 0],
  ],
  T: [
    [0, 0, 0],
    [6, 6, 6],
    [0, 6, 0],
  ],
  Z: [
    [0, 0, 0],
    [7, 7, 0],
    [0, 7, 7],
  ],
};

function randomForme() {
  var keys = Object.keys(formes);
  return formes[keys[Math.floor(keys.length * Math.random())]];
}

function newBlock() {
  var forme = randomForme();
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] != 0) {
        return {
          forme: forme,
          x: 4,
          y: -i,
        };
      }
    }
  }
}

var currentblock = newBlock();
var nextblock = newBlock();

function drawGrid(canvas) {
  var ctx = canvas.getContext("2d");
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  ctx.beginPath();
  for (let i = 0; i < w; i += baseUnit) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
  }
  for (let j = 0; j < h; j += baseUnit) {
    ctx.moveTo(0, j);
    ctx.lineTo(w, j);
  }
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
}

function drawMap(canvas, map) {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      var c = map[i][j];
      if (c != 0) {
        ctx.fillStyle = colors[c - 1];
        ctx.fillRect(j * baseUnit, i * baseUnit, baseUnit, baseUnit);
      }
    }
  }
}

function rotate() {
  if (currentblock.y >= 0) {
    currentblock.forme = currentblock.forme[0].map((val, index) =>
      currentblock.forme.map((row) => row[index]).reverse()
    );
  }
}

function drawForme(newX, newY, clear) {
  var copy = JSON.parse(JSON.stringify(map));
  for (let i = currentblock.forme.length - 1; i >= 0; i--) {
    for (let j = 0; j < currentblock.forme[i].length; j++) {
      if (currentblock.forme[i][j] != 0) {
        const x = j + newX;
        const y = i + newY;
        if (clear) {
          copy[y][x] = 0;
        } else {
          if (
            x < 0 ||
            x > canvas.clientWidth / baseUnit - 1 ||
            y > canvas.clientHeight / baseUnit - 1 ||
            map[y][x] != 0
          ) {
            return false;
          } else {
            copy[y][x] = currentblock.forme[i][j];
          }
        }
      }
    }
  }
  map = copy;
  drawMap(canvas, map);
  return true;
}

function drawCurrent(newX, newY) {
  if (drawForme(newX, newY, false)) {
    currentblock.x = newX;
    currentblock.y = newY;
    return false;
  } else {
    drawForme(currentblock.x, currentblock.y, false);
    return true;
  }
}

function addScore(lignes) {
  score += (lignes * 10) ** 2;
  document.getElementById("score").innerHTML = "Score: " + score;
  if (speed > 200) {
    speed -= lignes * 30;
  }
}

function testLine() {
  var h = currentblock.forme.length;
  var lignes = 0;
  for (let i = 0; i < h; i++) {
    var ligne = true;
    var l = currentblock.y + i;
    if (l >= 0 && l < map.length) {
      for (let j = 0; j < map[l].length; j++) {
        if (map[l][j] == 0) {
          ligne = false;
        }
      }
      if (ligne) {
        for (let k = l; k > 0; k--) {
          map[k] = map[k - 1];
        }
        lignes++;
      }
    }
  }
  addScore(lignes);
}

function moveCurrent() {
  drawForme(currentblock.x, currentblock.y, true);
  if (drawCurrent(currentblock.x, currentblock.y + 1)) {
    testLine();
    currentblock = nextblock;
    nextblock = newBlock();
    drawMap(document.getElementById("next_block"), nextblock.forme);
    drawGrid(document.getElementById("next_block"));
    for (let i = 0; i < map[0].length; i++) {
      if (map[0][i] != 0) {
        alert("Vous avez perdu.\nVotre score est de " + score + "pts.");
        document.location.reload();
        break;
      }
    }
    drawForme(currentblock.x, currentblock.y, false);
  }
}

document.addEventListener("keydown", (event) => {
  drawForme(currentblock.x, currentblock.y, true);
  switch (event.key) {
    case "ArrowUp":
      rotate();
      if (drawCurrent(currentblock.x, currentblock.y)) {
        rotate();
        rotate();
        rotate();
        drawCurrent(currentblock.x, currentblock.y);
      }
      break;
    case "ArrowDown":
      if (drawCurrent(currentblock.x, currentblock.y + 1)) {
        moveCurrent();
      }
      break;
    case "ArrowLeft":
      drawCurrent(currentblock.x - 1, currentblock.y);
      break;
    case "ArrowRight":
      drawCurrent(currentblock.x + 1, currentblock.y);
      break;
    default:
      drawCurrent(currentblock.x, currentblock.y);
  }
});

function loop() {
  moveCurrent();
  window.setTimeout(loop, speed);
}

function init() {
  drawGrid(document.getElementById("grille_bg"));
  drawMap(canvas_next, nextblock.forme);
  drawGrid(canvas_next);
  loop();
}

init();
