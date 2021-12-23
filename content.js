let addImg = () => {
  let img = prompt("Please enter an image url"),
    lastImg = document.querySelector(".character:last-of-type"),
    newItem = lastImg.cloneNode(),
    newId = parseInt(newItem.getAttribute("id")) + 1;
  newItem.setAttribute("id", newId);
  newItem.setAttribute("style", `background-image: url("${img}")`);
  lastImg.parentNode.append(newItem);
};

let init = () => {
  let btn = document.createElement("button");
  btn.innerText = "Add Item with Tierhacker";
  btn.setAttribute("id", "tierhacker-btn");
  btn.addEventListener("click", addImg);
  document.querySelector("#create-image-carousel").after(btn);
};

document.addEventListener("DOMContentLoaded", init());
