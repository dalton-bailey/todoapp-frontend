// //Completed Todos
// const completedTodosArray = initalTodos.filter(
//   (item) => item.complete === true
// );

// //toggle completed todos
// const clearDoneTodos = document.querySelector("#clearDoneBtn");
// clearDoneTodos.addEventListener("click", (event) => {
//   const header = document.querySelector(".completedheader");
//   header.innerHTML = "Completed Todos";

//   //completed todos
//   function addCompletedTodo(item) {
//     let completedUl = document.querySelector(".completedTodos");

//     const todo = document.createElement("li");

//     todo.innerHTML = `
//       <label>${item.category} - ${item.todo}</label>
//       `;

//     completedUl.appendChild(todo);
//   }

//   function initCompletedTodos() {
//     if (window.localStorage.getItem("todo")) {
//       getFromStorage();
//     } else {
//       saveToStorage();
//     }

//     const completedList = document.querySelector(".completedTodos");
//     completedList.innerHTML = "";
//     completedTodosArray.forEach((item) => addCompletedTodo(item));
//   }

//   function mainCompleted() {
//     initCompletedTodos();
//   }

//   mainCompleted();

//   let completedTodos = document.getElementById("completedTodos");

//   if (completedTodos.style.display === "block") {
//     completedTodos.style.display = "none";
//   } else {
//     completedTodos.style.display = "block";
//   }
// });
