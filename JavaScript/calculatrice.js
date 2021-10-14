var nombres = document.getElementsByClassName("nombre");

for (let nbr of nombres) {
  nbr.addEventListener("click", function () {
    var oldRes = document.getElementById("resultat").innerHTML;
    document.getElementById("resultat").innerHTML =
      oldRes == 0 ? nbr.textContent : oldRes + nbr.textContent;
  });
}

document.getElementById("C").addEventListener("click", function () {
  document.getElementById("resultat").innerHTML = 0;
});

document.getElementById("CE").addEventListener("click", function () {
  var oldRes = document.getElementById("resultat").innerHTML;
  document.getElementById("resultat").innerHTML =
    oldRes.length == 1 ? 0 : oldRes.slice(0, -1);
});

var touches = document.getElementsByClassName("touches");

for (let t of touches) {
  t.addEventListener("click", function () {
    var oldRes = document.getElementById("resultat").innerHTML;
    document.getElementById("resultat").innerHTML =
      {
        ".": oldRes + t.textContent,
        x: oldRes + " * ",
      }[t.textContent] || oldRes + " " + t.textContent + " ";
  });
}

document.getElementById("egal").addEventListener("click", function () {
  try {
    document.getElementById("resultat").innerHTML = eval(
      document.getElementById("resultat").innerHTML
    );
  } catch (error) {
    document.getElementById("resultat").innerHTML = "Erreur";
  }
});
