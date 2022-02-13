let { pathname } = window.location;
let page = "th-" + pathname.replace(/create/gi, "").replace(/\//gi, "");

let addImg = () => {
  let input = document.querySelector("#tierhacker-input");
  let img = input.value;
  if (img) {
    let lastImg = document.querySelector(".character"),
      newItem = lastImg.cloneNode(),
      newId = "th" + new Date().getTime().toString();
    newItem.setAttribute("id", newId);
    newItem.setAttribute("style", `background-image: url("${img}")`);
    registerCustomImage(newId, img);
    document.querySelector("#create-image-carousel").append(newItem);
    input.value = "";
  }
};

let init = () => {
  let div = document.createElement("div");
  div.setAttribute("id", "tierhacker-container");
  document.querySelector("#create-image-carousel").after(div);
  let btn = document.createElement("button");
  btn.innerText = "Add Item with Tierhacker";
  btn.setAttribute("id", "tierhacker-btn");
  btn.addEventListener("click", addImg);
  let input = document.createElement("input");
  input.setAttribute("id", "tierhacker-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add image to your list");
  document.querySelector("#tierhacker-container").append(btn);
  document.querySelector("#tierhacker-container").prepend(input);
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
