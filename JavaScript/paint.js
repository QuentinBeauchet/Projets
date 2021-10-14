var canvas = document.getElementById("feuille");
var ctx = canvas.getContext("2d");
var undo = [];
var redo = [];
var drawing = false;
var currentColor = "#000000";
var lineWidth = 15;

function randomColor() {
  const c = "0123456789ABCDEF";
  var couleur = "#";
  for (let index = 0; index < 6; index++) {
    couleur += c[Math.floor(Math.random() * c.length)];
  }
  return couleur;
}

function init() {
  for (let index = 0; index < 20; index++) {
    const col = document.createElement("button");
    col.className = "couleur";
    col.style.backgroundColor = randomColor();
    ctx.lineWidth = lineWidth;
    document.getElementById("slider").value = lineWidth;
    document.getElementById("taille_nbr").innerHTML = "Taille: " + lineWidth;
    col.addEventListener("click", () => {
      ctx.strokeStyle = col.style.backgroundColor;
    });
    document.getElementById("couleurs").appendChild(col);
  }
}

function getState() {
  return {
    save: ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight),
    bg_color: canvas.style.backgroundColor || "inherit",
  };
}

function loadState(pop, push) {
  var laststate = pop.pop();
  console.log(laststate);
  if (laststate) {
    push.push(getState());
    ctx.putImageData(laststate.save, 0, 0);
    canvas.style.backgroundColor = laststate.bg_color;
  }
}

canvas.addEventListener("mousedown", (event) => {
  undo.push(getState());
  redo = [];
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(event.layerX, event.layerY);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener("mousemove", (event) => {
  if (drawing) {
    ctx.lineTo(event.layerX, event.layerY);
    ctx.stroke();
  }
});

document.getElementById("crayon").addEventListener("click", () => {
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = lineWidth;
});

document.getElementById("gomme").addEventListener("click", () => {
  currentColor = ctx.strokeStyle;
  ctx.strokeStyle = "#ffffff";
});

document.getElementById("remplir").addEventListener("click", () => {
  undo.push(getState());
  console.log(undo);
  canvas.style.backgroundColor = ctx.strokeStyle;
  ctx.fill();
});

document.getElementById("slider").addEventListener("mouseup", (event) => {
  const val = event.path[0].value;
  ctx.lineWidth = val;
  document.getElementById("taille_nbr").innerHTML = "Taille: " + val;
});

document.getElementById("undo").addEventListener("click", () => {
  loadState(undo, redo);
});

document.getElementById("redo").addEventListener("click", () => {
  loadState(redo, undo);
});

init();
