"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://fir-cart-app-2bcbe-default-rtdb.europe-west1.firebasedatabase.app/",
};
//connects app with fb
const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartItem = ref(database, "items");
/****/
const userInput = document.getElementById("input-field");
userInput.focus();
const addBtn = document.getElementById("add-btn");
const resultsBox = document.getElementById("results-box");

let currentID;
/*empty input field*/
const emptyInput = () => {
  userInput.value = "";
};
/*delete  item*/
const removeItem = (e) => {
  let elem = e.target;
  let elemId = elem.id;
  console.log(elemId);
  let exactLocationInDB = ref(database, `items/${elemId}`);
  remove(exactLocationInDB);
  showResults();
};
/*show results*/
const showResults = () => {
  resultsBox.innerHTML = "";
  try {
    onValue(cartItem, (snapshot) => {
      if (snapshot.val() !== null) {
        let itemArray = Object.entries(snapshot.val());
        itemArray.forEach((item) => {
          let newElem = document.createElement("p");
          newElem.classList.add("item-style");
          newElem.setAttribute("id", item[0]);
          newElem.innerText = item[1];
          resultsBox.appendChild(newElem);
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/*add to cart*/
const addToCart = () => {
  let itemName = userInput.value;

  if (itemName !== undefined && itemName !== "") {
    push(cartItem, itemName);
    emptyInput();
    showResults();
  }
};

resultsBox.addEventListener("click", removeItem);
addBtn.addEventListener("click", addToCart);

window.addEventListener("load", showResults);
