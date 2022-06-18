
const barclick = document.querySelector("#barclick");

let isShow = false;

barclick.addEventListener("click", function () {
  isShow = !isShow;
  if (isShow) {
    document.querySelector("#pagelinks").style.display = "flex";
    document.querySelector("#search-wrapper").style.display = "flex";
  } else {
    document.querySelector("#pagelinks").style.display = "none";
    document.querySelector("#search-wrapper").style.display = "none";
  }
});
