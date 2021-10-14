var div = document.getElementById("elements");

class Element {
  constructor(nom, age, description, image) {
    this.nom = nom;
    this.age = age;
    this.description = description;
    this.image = image;
  }
}

const elements = {
  0: new Element(
    "Berger allemand",
    "9 à 13 ans",
    "Le berger allemand est une race de chiens tirant son nom de son pays d'origine, l'Allemagne, où elle est apparue à la fin du XIXᵉ siècle.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Berger_allemand_en_montagne.jpg/1200px-Berger_allemand_en_montagne.jpg"
  ),
  1: new Element(
    "Labrador",
    "10 à 12 ans",
    "Le retriever du Labrador, plus communément appelé labrador retriever ou plus simplement labrador, est une race de chiens originaire du Royaume-Uni. C'est un chien de taille moyenne, à l'allure ronde et robuste, de couleur généralement sable, chocolat ou noir.",
    "https://upload.wikimedia.org/wikipedia/commons/2/26/YellowLabradorLooking_new.jpg"
  ),
  2: new Element(
    "Loulou de Poméranie",
    "12 à 16 ans",
    "Le spitz nain, connu aussi sous le nom de loulou de Poméranie et parfois poméranien, est une variété de taille du spitz allemand, race de chien originaire d'Allemagne. Race de chien miniature, son nom vient de la province de Poméranie, aujourd'hui à cheval entre l'Allemagne orientale et la Pologne.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Scrappypom.jpg/1200px-Scrappypom.jpg"
  ),
  3: new Element(
    "Persan",
    "10 à 17 ans",
    "Le persan est une race de chat à poil long. Ce chat de taille moyenne à grande est caractérisé par son poil long et abondant, sa silhouette toute en rondeur et son visage au museau très court.",
    "https://www.zooplus.fr/magazine/wp-content/uploads/2018/02/fotolia_103481419-768x512.jpg"
  ),
  4: new Element(
    "Maine coon",
    "15 à 20 ans",
    "Le maine coon est une race de chat à poil mi-long originaire de l'État du Maine aux États-Unis. Ce chat au physique rustique est caractérisé par sa grande taille, sa queue en panache, son museau carré, ses oreilles avec plumets et son poil long.",
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Maincoooons.png"
  ),
  5: new Element(
    "Munchkin",
    "15 à 20 ans",
    "Le munchkin est une race de chat originaire des États-Unis, issu d'une mutation spontanée survenue en 1983. Ce chat est caractérisé par ses pattes très courtes, d'où le surnom de « chat basset » qu'on lui donne parfois.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Munchkin_chat.jpg/1200px-Munchkin_chat.jpg"
  ),
  6: new Element(
    "Limousine",
    "Jusqu'a 20 ans",
    "La limousine est une race bovine française rustique originaire du Limousin, qui est principalement vouée à la production de viande. C'est une vache de couleur marron, plus claire sous le ventre et autour des yeux et du mufle, avec des muqueuses rose clair.",
    "https://www.la-viande.fr/sites/default/files/article/images/limousine-2.jpg"
  ),
  7: new Element(
    "Poule domestique",
    "5 à 10ans",
    "Gallus gallus domesticus, en français la Poule domestique, le coq domestique, est une sous-espèce de l'ordre des Galliformes.",
    "https://i-dja.unimedias.fr/sites/art-de-vivre/files/styles/large/public/dja_poule-wyandotte-jardin_as.jpg?auto=compress%2Cformat&crop=faces%2Cedges&cs=srgb&fit=crop&h=719&w=900"
  ),
  8: new Element(
    "Cochon",
    "15 à 20ans",
    "Sus domesticus est une espèce de mammifères domestiques omnivores de la famille des Porcins, ou Suidés. Appelé porc ou cochon ou encore cochon domestique, il est resté proche du sanglier avec lequel il peut se croiser.",
    "https://media.4-paws.org/3/4/5/d/345d188136ddc21095891c7f12168b922219a623/pig%203-1930x1335-1920x1328.jpg"
  ),
};

const index = {
  chiens: [0, 1, 2],
  chats: [3, 4, 5],
  ferme: [6, 7],
};

function addElement(element) {
  div.insertAdjacentHTML(
    "beforeend",
    '<div class="element">' +
      '<img src="' +
      element.image +
      '">' +
      '<div class="desc">' +
      '<div class="description">' +
      '<p class="nom">' +
      element.nom +
      "</p>" +
      '<p class="age">' +
      element.age +
      "</p>" +
      "</div>" +
      '<div class="underline"></div>' +
      "<p>" +
      element.description +
      "</p>" +
      "</div>" +
      "</div>"
  );
}

function addAllElements(liste) {
  liste.forEach((e) => addElement(elements[e]));
}

function reset() {
  Object.keys(elements).forEach((key) => {
    addElement(elements[key]);
  });
}

document.querySelectorAll(".tag").forEach(function (currentBtn) {
  currentBtn.addEventListener("click", (e) => {
    //div.innerHTML = null;
    switch (e.target.innerHTML) {
      case "Chiens":
        addAllElements(index.chiens);
        break;
      case "Chats":
        addAllElements(index.chats);
        break;
      case "Ferme":
        addAllElements(index.ferme);
        break;
      default:
        reset();
    }
  });
});

reset();
