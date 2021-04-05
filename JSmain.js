//Selectors
var input = document.querySelector(".inputBox");
var button = document.querySelector(".add-button");
var list = document.querySelector(".todo-container");
var option = document.querySelector(".optionlist");
var countAll = document.getElementById("countAll");
var countFin = document.getElementById("countFinished");
var countUnfin = document.getElementById("countUnfinished");

//Listeners
button.addEventListener("click", addItem);
list.addEventListener("click", deleteItem);
option.addEventListener("click", chooseList);

// Starter values for counters
countAll.innerHTML = 0;
countFin.innerHTML = 0;
countUnfin.innerHTML = 0;

// Fetch localStorage & count items
getTodo();
countA();
countB();
countC();

// FUNCTIONS

// Counter function All Items
function countA() {
  var count = list.childElementCount;
  countAll.innerHTML = count;
}

// Counter function Unfinished Items
function countB() {
  var allItems = list.childElementCount;
  var count = 0;
  var completedItems = 0;
  var i;
  for (i = 0; i < list.childNodes.length; i++) {
    if (list.childNodes[i].classList.contains("completed")) {
      completedItems = completedItems + 1;
    }
  }
  count = allItems - completedItems;
  countUnfin.innerHTML = count;
}

// Counter function finished Items
function countC() {
  var completedItems = 0;
  var i;
  for (i = 0; i < list.childNodes.length; i++) {
    if (list.childNodes[i].classList.contains("completed")) {
      completedItems = completedItems + 1;
    }
  }
  countFin.innerHTML = completedItems;
}

// To Do Item function
function addItem(e) {
  e.preventDefault();
  //Creates ul
  var listUl = document.createElement("ul");
  listUl.classList.add("list", "unfinishedItem");
  //Creates new item Li
  var newItem = document.createElement("li");
  newItem.innerText = input.value;
  listUl.appendChild(newItem);
  //Creates done button
  var finishedButton = document.createElement("button");
  finishedButton.innerHTML = '<i class="fas fa-check fa-lg"></i>';
  finishedButton.classList.add("fin-btn");
  listUl.appendChild(finishedButton);
  //Creates delete button
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-times fa-lg"></i>';
  deleteButton.classList.add("del-btn");
  listUl.appendChild(deleteButton);

  //Validation -> if input is empty or too short, item not added to list
  if (input.value == "" || input.value.length < 3) {
    alert("Add a proper task!");
    input.classList.add("validation"); //Adds CSS style
    input.focus();
    return false;
  } else {
    list.appendChild(listUl);
    input.classList.remove("validation"); //Removes CSS style if it has been previously added
  }
  input.value = ""; //Empty input after submitting
  countA(); // executes counter function A & B
  countB();
  storeTodo(); // Stores info to LocalStorage
}

//Delete item function
function deleteItem(e) {
  if (e.target.classList[0] == "del-btn") {
    e.target.parentElement.remove(); //Removes item
  }
  if (e.target.classList[0] == "fin-btn") {
    e.target.parentElement.classList.toggle("unfinishedItem"); //Takes away class .unfinishedItem
    e.target.parentElement.classList.toggle("completed"); //Inputs class .completed
  }
  // Executes counter function A, B, C
  countA();
  countB();
  countC();
  storeTodo(); // Stores info to LocalStorage
}

// Choose all, unfinished or finished items function

function chooseList() {
  var i;
  if (option.value == "finished") {
    for (i = 0; i < list.childNodes.length; i++) {
      if (list.childNodes[i].classList.contains("completed")) {
        list.childNodes[i].style.display = "flex"; //Shows those items that have class .completed
      } else {
        list.childNodes[i].style.display = "none"; //Hides those items that do not have the class
      }
    }
  } else if (option.value == "unfinished") {
    for (i = 0; i < list.childNodes.length; i++) {
      if (list.childNodes[i].classList.contains("unfinishedItem")) {
        list.childNodes[i].style.display = "flex"; //Shows those items that have class .unfinishedItem
      } else {
        list.childNodes[i].style.display = "none"; //Hides those items that do not have the class
      }
    }
  } else if (option.value == "all") {
    for (i = 0; i < list.childNodes.length; i++) {
      list.childNodes[i].style.display = "flex"; //Shows all items
    }
  }
  storeTodo();
}

//localStorage functions

function storeTodo() {
  localStorage.setItem("todos", list.innerHTML); //Stores info
}

function getTodo() {
  list.innerHTML = localStorage.getItem("todos"); //Gets stored information
}
