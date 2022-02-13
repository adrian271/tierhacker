let { pathname } = window.location;
let page = "th-" + pathname.replace(/create/gi, "").replace(/\//gi, "");

let addImg = (ev) => {
  ev.preventDefault();
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
    resetPreviewer();
  }
};

let init = () => {
  let div = document.createElement("div");
  div.setAttribute("id", "tierhacker-container");
  document.querySelector("#create-image-carousel").after(div);

  let form = document.createElement("form");
  document.querySelector("#tierhacker-container").append(form);

  let imgPreview = document.createElement("div");
  imgPreview.setAttribute("id", "image-preview");
  document.querySelector("#tierhacker-container").append(imgPreview);

  let btn = document.createElement("button");
  btn.innerText = "Add Item with Tierhacker";
  btn.setAttribute("id", "tierhacker-btn");
  btn.disabled = true;
  btn.addEventListener("click", addImg);

  let input = document.createElement("input");
  input.setAttribute("id", "tierhacker-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add image to your list");
  input.addEventListener("keyup", updatePreviewer);

  document.querySelector("#tierhacker-container form").append(btn);
  document.querySelector("#tierhacker-container form").prepend(input);
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

let updatePreviewer = () => {
  let previewer = document.querySelector("#image-preview"),
    btn = document.querySelector("#tierhacker-btn"),
    newImg = document.querySelector("#tierhacker-input").value;
  if (newImg) {
    previewer.style.backgroundImage = `url("${newImg}")`;
    previewer.classList.add("filled");
    btn.disabled = false;
  } else {
    previewer.style.backgroundImage = ``;
    previewer.classList.remove("filled");
    btn.disabled = true;
  }
};

let resetPreviewer = () => {
  let previewer = document.querySelector("#image-preview"),
    btn = document.querySelector("#tierhacker-btn");
  previewer.style.backgroundImage = ``;
  previewer.classList.remove("filled");
  btn.disabled = true;
};

document.addEventListener("DOMContentLoaded", init());
