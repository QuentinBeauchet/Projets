var num = 0;

function setListeners(num) {
  document.getElementById("m" + num).addEventListener("click", (event) => {
    modifierElement(event.path[1].id);
  });

  document.getElementById("s" + num).addEventListener("click", (event) => {
    supprimerElement(event.path[1].id);
  });
}

function ajoutElement(val) {
  document
    .getElementById("liste")
    .insertAdjacentHTML(
      "beforeend",
      '<li class="element" id="i' +
        num +
        '"><span>' +
        val +
        '</span><button class="modifier" id="m' +
        num +
        '">Modifier</button>' +
        '<button class="supprimer" id="s' +
        num +
        '">Supprimer</button>' +
        "</li>"
    );

  setListeners(num);
  num++;
}

function modifierElement(id) {
  var html = document.getElementById(id).cloneNode(true);
  const textContent = document.getElementById(id).firstChild.textContent;
  document.getElementById(id).innerHTML =
    '<input type="text" id="modification_texte" name="modification" value="' +
    textContent +
    '"/><button id="modification_boutton">OK</button>';

  document
    .getElementById("modification_boutton")
    .addEventListener("click", (event) => {
      var val = document.getElementById("modification_texte").value;
      if (val) {
        html.firstChild.innerHTML = val;
        document.getElementById(id).innerHTML = html.innerHTML;
        setListeners(event.path[1].id[1]);
      }
    });
}

function supprimerElement(id) {
  document.getElementById(id).outerHTML = null;
}

document.getElementById("ajout").addEventListener("click", () => {
  var el = document.getElementById("texte");
  const val = el.value;
  el.value = "";
  if (val) {
    ajoutElement(val);
  }
});
