function openMenu() {
  var x = document.getElementById("collapse");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
document.getElementById("hamb-btn").addEventListener("click", openMenu);

if (document.querySelector(".carousel")) {
  new Glide(".carousel").mount();
}
