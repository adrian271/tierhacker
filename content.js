let { pathname } = window.location;
let page = "th-" + pathname.replace(/create/gi, "").replace(/\//gi, "");

let addImg = () => {
  let img = prompt("Please enter an image url"),
    lastImg = document.querySelector(
      "#create-image-carousel .character:last-of-type"
    ),
    newItem = lastImg.cloneNode(),
    newId = "th" + new Date().getTime().toString();
  newItem.setAttribute("id", newId);
  newItem.setAttribute("style", `background-image: url("${img}")`);
  registerCustomImage(newId, img);
  lastImg.parentNode.append(newItem);
};

let init = () => {
  let btn = document.createElement("button");
  btn.innerText = "Add Item with Tierhacker";
  btn.setAttribute("id", "tierhacker-btn");
  btn.addEventListener("click", addImg);
  document.querySelector("#create-image-carousel").after(btn);
  restoreCustomImages();
};

let registerCustomImage = (id, imgStr) => {
  let localData = localStorage.getItem(page) || "{}";
  let obj = JSON.parse(localData);
  obj[id] = imgStr;
  localStorage.setItem(page, JSON.stringify(obj));
};

let restoreCustomImages = () => {
  let imgData = localStorage.getItem(page) || "";
  if (imgData) {
    let obj = JSON.parse(imgData);
    for (item in obj) {
      let style = document.createElement("style");
      style.innerText = `#${item} {background-image: url(${obj[item]}) !important}`;
      document.body.append(style);
    }
  }
};

document.addEventListener("DOMContentLoaded", init());
