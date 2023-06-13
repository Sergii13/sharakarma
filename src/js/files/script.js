// Подключение функционала "Чертогов Фрилансера"
import { removeClasses } from "./functions.js";
// Подключение списка активных модулей

let dataSelectWrap = document.querySelectorAll("[data-select-wrap]");

document.addEventListener("click", function (e) {
  let target;
  if (e.target.closest("[data-select]")) {
    e.preventDefault();
    target = e.target.closest("[data-select]");
    target.closest("[data-select-wrap]").classList.toggle("active");
  } else if (
    !e.target.closest("[data-select]") &&
    !e.target.closest(".select-exchange") &&
    document.querySelector("[data-select-wrap].active")
  ) {
    removeClasses(dataSelectWrap, "active");
  }
});

function copyTextToClipboard(text) {
  let textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if the element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    let copiedLabel = document.querySelector(".copied");
    if (copiedLabel) {
      copiedLabel.hidden = false;
      setTimeout(() => {
        copiedLabel.hidden = true;
      }, 1500);
    }
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

let allBtnCopy = document.querySelectorAll(".copy__button");
if (allBtnCopy.length) {
  allBtnCopy.forEach((item) => {
    item.addEventListener("click", function (e) {
      const textValue = item
        .closest(".copy")
        .querySelector(".copy__value").innerHTML;
      copyTextToClipboard(textValue);
    });
  });
}
const allFiles = document.querySelectorAll(".form-file__input");
if (allFiles.length > 0) {
  allFiles.forEach((fileInput) => {
    const parent = fileInput.closest("label");
    const imgPreview = parent.querySelector(".form-file__preview-ibg");

    fileInput.addEventListener("change", (e) => {
      parent.classList.add("fill");
      const [file] = fileInput.files;
      if (file) {
        imgPreview.innerHTML = `<img src="${URL.createObjectURL(
          file
        )}" alt="">`;
      }
    });
  });
}
const verify = document.querySelector("[data-verify]");
if (verify) {
  const allRadio = verify.querySelectorAll("[data-verify-options] input");
  const activeIndex = Array.from(allRadio).findIndex((item) => item.checked);
  const allBlock = verify.querySelectorAll("[data-verify-item]");
  allBlock[activeIndex].classList.add("active");
  allRadio.forEach((item, index) => {
    item.addEventListener("change", (e) => {
      if (item.checked) {
        removeClasses(allBlock, "active");
        console.log();
        allBlock[index].classList.add("active");
      }
    });
  });
}
