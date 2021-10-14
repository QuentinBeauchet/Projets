function preventDefault(e) {
  e.preventDefault();
}

document
  .getElementById("centre_portfolio")
  .addEventListener("mouseenter", () => {
    document.body.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  });

document
  .getElementById("centre_portfolio")
  .addEventListener("mouseleave", () => {
    document.body.removeEventListener("wheel", preventDefault, {
      passive: false,
    });
  });

document.getElementById("centre_portfolio").addEventListener(
  "wheel",
  (event) => {
    document.getElementById("centre_portfolio").scrollLeft +=
      event.deltaY * 0.5;
  },
  { passive: true }
);
