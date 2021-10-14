var boutton = document.getElementById("top");
var menu = document.querySelectorAll("nav")[0];

function scrollTo(y) {
  window.scrollTo({
    top: y,
    left: 0,
    behavior: "smooth",
  });
}

boutton.addEventListener("click", (e) => {
  scrollTo(0);
});

document.addEventListener("scroll", (e) => {
  var y = window.pageYOffset;

  boutton.style.display = y > 100 ? "flex" : "none";
  menu.id = y > menu.getBoundingClientRect().height ? "menu" : undefined;
});

document.querySelectorAll('a[href^="#"]').forEach((e) => {
  var el = e.getAttribute("href");
  var y = 0;
  if (el != "#") {
    var sec = document.querySelector(el);
    var marginTop = window.getComputedStyle(sec).marginTop.slice(0, 2);
    y =
      window.pageYOffset +
      sec.getBoundingClientRect().y -
      (menu.getBoundingClientRect().height * 2 + parseInt(marginTop));
  }
  e.addEventListener("click", (f) => {
    f.preventDefault();
    scrollTo(y);
  });
});
