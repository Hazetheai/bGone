// listener listens for click to element.
// logs which element was clicked
// assigns display: none style to element
let elementArray = [];

// If d key is pressed add listener to document.
function checkKeyPressed(evt) {
  if (evt.keyCode == "68") {
    document.addEventListener("mouseover", hoverElement);
  }
}

// If key is released, remove hoverClass, reinitialize array to 0 and remove event listener
function checkKeyReleased(evt) {
  if (evt.keyCode == "68") {
    elementArray.map(el => {
      el.classList.remove("hoverColor");
    });
    elementArray = [];
    document.removeEventListener("mouseover", hoverElement);
  }
}

// add element to array, add hover class and listener to delete element from page
function hoverElement(e) {
  elementArray.unshift(e.target);

  elementArray[0].classList.add("hoverColor");
  elementArray[0].addEventListener("click", deleteElement);
  if (elementArray.length > 1) {
    elementArray[1].classList.remove("hoverColor");
    elementArray[1].removeEventListener("click", deleteElement);

    elementArray.pop();
  }
}

function deleteElement(e) {
  e.preventDefault();
  let element = e.target || e.srcElement;
  element.style.display = "none";
  return false;
}

document.addEventListener("keydown", checkKeyPressed, false);

document.addEventListener("keyup", checkKeyReleased, false);
