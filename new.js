const api = "https://mighty-dusk-75086.herokuapp.com/todos";
// const api = 'http://localhost:3000/todos'
let initialTodos = [];

//fetch todos
async function fetchTodos() {
  let response = await fetch(api);
  let todos = await response.json();

  console.log(todos);

  return todos;
}

//post fetch
async function postTodo(data) {
  let response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
}

//new todo content
function newTodo(todoContent, todoCategory) {
  const todoData = {
    todo: todoContent,
    complete: false,
    category: todoCategory,
  };

  postTodo(todoData);

  initialTodos.push(todoData);

  displayTodos();
}


//delete fetch
async function deleteTodoFetch(id) {
  let response = await fetch(api + "/" + id, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  });
}

//put fetch
async function completeTodoFetch(id) {
  let response = await fetch(api + "/" + id, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
    },
  });
}

function completeTodo(id) {
  const index = initialTodos.findIndex((item) => item.id == id);
  const complete = {
    complete: true,
  }
  completeTodoFetch(complete);
}

//set up checkmark
function setupCompleteButtons() {
  const check = document.getElementsByClassName("check");
  for (let t = 0; t < check.length; t++) {
    check[t].addEventListener("click", (event) => {
      completeTodo(event.target.dataset.id);

      // if (initialTodos[id].complete === true) {
      //   console.log(check.parentElement);
      // } else {
      //   console.log("false");
      // }
    });
  }
}

//splice todo for user interfce
function deleteTodo(id) {
  const index = initialTodos.findIndex((item) => item.id == id);
  deleteTodoFetch(id);
  initialTodos.splice(index, 1);
  displayTodos();
}

//delete list items
function setupDeleteButtons() {
  const close = document.getElementsByClassName("close");
  for (let t = 0; t < close.length; t++) {
    close[t].addEventListener("click", (event) => {
      deleteTodo(event.target.dataset.id);
    });
  }
}


//displays todos
function displayTodos() {
  const initalList = document.querySelector(".initialTodos");
  initalList.innerHTML = "";

  initialTodos.forEach((item) => addTodo(item));

  setupDeleteButtons();
  setupCompleteButtons()
}

function addTodo(item) {
  const initalList = document.querySelector(".initialTodos");
  const todoItem = document.createElement("li");
  todoItem.className = "li";

  const check = document.createElement("input");
  check.type = "checkbox";

  check.dataset.id = item._id;
  check.className = "check";

  check.id = "check";
  check.checked = item.complete;

  todoItem.innerHTML = `
      <label>${item.category} - ${item.todo}</label>
      <button data-id="${item._id}" class="close">X</button>
      `;

  todoItem.prepend(check);
  initalList.appendChild(todoItem);
}

async function main() {
  const todos = await fetchTodos();
  initialTodos = todos;
  displayTodos();

  //event listener for new todo
  const form = document.querySelector("#form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputValue = document.getElementById("newTodo");
    let t = inputValue.value.trim();

    let categoryValue = document.getElementById("newCategory");
    let n = categoryValue.value.trim();

    if (inputValue.value === " ") {
      alert("Please input a name and category");
    } else if (categoryValue.value === " ") {
      alert("Please input a name and category");
    } else {
      newTodo(t, n);
    }

    inputValue.value = " ";
    inputValue.focus();

    categoryValue.value = " ";
    categoryValue.focus();
  });
}

main();


const header = document.querySelector(".categoryHeader");

//toggle all todos
const allTodos = document.querySelector("#allTodosBtn");
allTodos.addEventListener("click", (event) => {
  let allTodos = document.getElementById("initialTodos");
  let grocery = document.getElementById("groceryTodos");
  let school = document.getElementById("schoolTodos");
  let house = document.getElementById("houseTodos");

  header.innerHTML = "All Todos";

  if (allTodos.style.display === "block") {
    allTodos.style.display = "none";
  } else {
    allTodos.style.display = "block";
    // grocery.style.display = "none";
    // school.style.display = "none";
    // house.style.display = "none";
  }
});

// //grocery todos

// //creates grocery todos
// function addGroceryTodo(item) {
//   let groceriesUl = document.querySelector(".groceryTodos");

//   const todo = document.createElement("li");
//   todo.className = "li";

//   todo.innerHTML = `
//     <label>${item.category} - ${item.todo}</label>
//     `;

//   groceriesUl.appendChild(todo);
// }

// //initializes grocery todos
// function initGroceryList() {
//   if (window.localStorage.getItem("todo")) {
//     getFromStorage();
//   } else {
//     saveToStorage();
//   }

//   const groceryList = document.querySelector(".groceryTodos");
//   groceryList.innerHTML = "";
//   groceryItems.forEach((item) => addGroceryTodo(item));
// }

// //school todos

// //create school todos
// function addSchoolTodo(item) {
//   const schoolUl = document.querySelector(".schoolTodos");
//   const todo = document.createElement("li");

//   todo.innerHTML = `
//     <label>${item.category} - ${item.todo}</label>
//     `;

//   schoolUl.appendChild(todo);
// }

// //initializes school todos
// function initSchoolList() {
//   if (window.localStorage.getItem("todo")) {
//     getFromStorage();
//   } else {
//     saveToStorage();
//   }

//   const schoolList = document.querySelector(".schoolTodos");
//   schoolList.innerHTML = "";
//   schoolItems.forEach((item) => addSchoolTodo(item));
// }

// //house todos

// //create house todos
// function addHouseTodo(item) {
//   let houseUl = document.querySelector(".houseTodos");

//   const todo = document.createElement("li");

//   todo.innerHTML = `
//     <label>${item.category} - ${item.todo}</label>
//     `;

//   houseUl.appendChild(todo);
// }

// //initializes house todos
// function initHouseList() {
//   if (window.localStorage.getItem("todo")) {
//     getFromStorage();
//   } else {
//     saveToStorage();
//   }

//   const houseList = document.querySelector(".houseTodos");
//   houseList.innerHTML = "";
//   houseItems.forEach((item) => addHouseTodo(item));
// }

// //toggle grocery todos
// const grocery = document.querySelector("#groceryBtn");
// grocery.addEventListener("click", (event) => {
//   let grocery = document.getElementById("groceryTodos");
//   let school = document.getElementById("schoolTodos");
//   let allTodos = document.getElementById("initialTodos");
//   let house = document.getElementById("houseTodos");

//   header.innerHTML = "Grocery Todos"

//   if (grocery.style.display === "block") {
//     grocery.style.display = "none";
//   } else {
//     grocery.style.display = "block";
//     allTodos.style.display = "none";
//     school.style.display = "none";
//     house.style.display = "none";
//   }
// });

// //toggle school todos
// const school = document.querySelector("#schoolBtn");
// school.addEventListener("click", (event) => {
//   let school = document.getElementById("schoolTodos");
//   let grocery = document.getElementById("groceryTodos");
//   let allTodos = document.getElementById("initialTodos");
//   let house = document.getElementById("houseTodos");

//   header.innerHTML = "School Todos"

//   if (school.style.display === "block") {
//     school.style.display = "none";
//   } else {
//     school.style.display = "block";
//     allTodos.style.display = "none";
//     grocery.style.display = "none";
//     house.style.display = "none";

//   }
// });

// //toggle house todos
// const house = document.querySelector("#houseBtn");
// house.addEventListener("click", (event) => {
//   let house = document.getElementById("houseTodos");
//   let school = document.getElementById("schoolTodos");
//   let grocery = document.getElementById("groceryTodos");
//   let allTodos = document.getElementById("initialTodos");

//   header.innerHTML = "House Todos"

//   if (house.style.display === "block") {
//     house.style.display = "none";
//   } else {
//     house.style.display = "block";
//     school.style.display = "none";
//     allTodos.style.display = "none";
//     grocery.style.display = "none";
//   }
// });

// //local storage
// function saveToStorage() {
//   window.localStorage.setItem("todo", JSON.stringify(initialTodos));
// }

// function getFromStorage() {
//   initialTodos = JSON.parse(window.localStorage.getItem("todo"));
// }

//filter by category
// const groceryItems = initialTodos.filter((item) => item.category === "Grocery");
// const schoolItems = initialTodos.filter((item) => item.category === "School");
// const houseItems = initialTodos.filter((item) => item.category === "House");

// push new todo to inital array and call displayTodos to display
