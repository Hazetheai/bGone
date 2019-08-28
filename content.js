// listener listens for click to element.
// logs which element was clicked
// assigns display: none style to element
let elementArray = [];
let recentKeys = [];
const deletionHistory = [];
const dblTaps = [];
let timeout;
let lastTap = 0;
// If d key is pressed add listener to document.
function checkKeyPressed(evt) {
  if (evt.keyCode != "66") {
    recentKeys = [];
    return;
  }
  recentKeys.push(evt.keyCode);

  if (evt.keyCode == "66" && recentKeys.length == 1) {
    document.addEventListener("mouseover", hoverElement);
  }
}

// If key is released, remove hoverClass, reinitialize array to 0 and remove event listener
function checkKeyReleased(evt) {
  if (evt.keyCode == "66") {
    elementArray.map(el => {
      el.classList.remove("hoverColor");
    });
    elementArray = [];
    recentKeys = [];
    document.removeEventListener("mouseover", hoverElement);
  }
}

// add element to array, add hover class and listener to delete element from page
function hoverElement(e) {
  elementArray.unshift(e.target);

  elementArray[0].classList.add("hoverColor");
  elementArray[0].addEventListener("click", deleteElement, false);
  if (elementArray.length > 1) {
    elementArray[1].classList.remove("hoverColor");
    elementArray[1].removeEventListener("click", deleteElement);

    elementArray.pop();
  }
}

function deleteElement(e) {
  if (recentKeys.length < 1) {
    return;
  } else {
    e.preventDefault();
    let element = e.target || e.srcElement;
    deletionHistory.unshift({
      el: element,
      display: element.style.display || "block"
    });
    element.style.display = "none";
    return false;
  }
}

function restoreLast() {
  if (deletionHistory.length) {
    let lastElement = deletionHistory[0];
    lastElement.el.style.display = lastElement.display;
    deletionHistory.shift();
  } else return "";
}

// checks for double-taps on b key
document.addEventListener("keyup", function(event) {
  var currentTime = new Date().getTime();
  var tapLength = currentTime - lastTap;
  clearTimeout(timeout);
  if (tapLength < 500 && tapLength > 0) {
    restoreLast();
    event.preventDefault();
  } else {
    timeout = setTimeout(function() {
      clearTimeout(timeout);
    }, 500);
  }
  lastTap = currentTime;
});

document.addEventListener("keydown", checkKeyPressed, false);

document.addEventListener("keyup", checkKeyReleased, false);
