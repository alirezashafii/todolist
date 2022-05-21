const addBtn = document.querySelector(".add-btn");
const confirmBtn = document.querySelector(".confirm");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".backdrop");
const input = document.getElementById("item");
const toDoList = document.querySelector("section");
const counter = document.querySelector(".count");
const filterOption = document.getElementById("filter-todos");

document.addEventListener("DOMContentLoaded", getLocalTodos);
toDoList.addEventListener("click", checkRemove);
backDrop.addEventListener("click", closeModal);
addBtn.addEventListener("click", () => {
  backDrop.style.display = "block";
  modal.style.display = "inline-block";
});
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") {
    document.querySelector(".modal h4").textContent = "please write something!";
  } else {
    const toDoDiv = document.createElement("article");
    const newContent = `
      <p>${input.value}</p>
      <span>
          <svg class="delete" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
      </span>
      <span>
          <svg class="done" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
      </span>`;
    toDoDiv.innerHTML = newContent;
    toDoList.appendChild(toDoDiv);
    savedTodos(input.value);
    input.value = "";
    backDrop.style.display = "none";
    modal.style.display = "none";
    // counter.textContent = toDoList.children.length;
    counter.textContent = JSON.parse(localStorage.getItem('todos')).length;
  }
});
filterOption.addEventListener("click", filterTodos);

function focusInput() {
  document.querySelector("#item").focus();
}
function closeModal() {
  backDrop.style.display = "none";
  modal.style.display = "none";
}
function checkRemove(e) {
  const classlist = [...e.target.classList];
  const item = e.target;
  if (classlist[0] === "done") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("iDidIt");
  } else if (classlist[0] === "delete") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
    // counter.textContent = toDoList.children.length;
    counter.textContent = JSON.parse(localStorage.getItem('todos')).length;
  }
}
function filterTodos(e) {
  const todos = [...toDoList.childNodes];
  todos.forEach((it) => {
    switch (e.target.value) {
      case "all":
        it.style.display = "flex";
        break;
      case "completed":
        if (it.classList.contains("iDidIt")) {
          it.style.display = "flex";
        } else {
          it.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!it.classList.contains("iDidIt")) {
          it.style.display = "flex";
        } else {
          it.style.display = "none";
        }
        break;
    }
  });
}
function savedTodos(item) {
  let savedLocal = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedLocal.push(item);
  localStorage.setItem("todos", JSON.stringify(savedLocal));
}
function getLocalTodos() {
  let savedtodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedtodos.forEach((item) => {
    const toDoDiv = document.createElement("article");
    const newContent = `
      <p>${item}</p>
      <span>
          <svg class="delete" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
      </span>
      <span>
          <svg class="done" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
      </span>`;
    toDoDiv.innerHTML = newContent;
    toDoList.appendChild(toDoDiv);
  });
}
function removeLocalTodos(item) {
  let savedtodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedtodos.filter(
    (t) => t !== item.children[0].textContent
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
