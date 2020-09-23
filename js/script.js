//storing input.text variable
let todoTextInput = document.getElementById("todoTextInput");

//storing ul in variable
let todoUl = document.getElementById("todoList");

//storing daiv.date in variable
let headDate = document.getElementById("date");

//creating instance for Date
var date = new Date().toDateString();

// storing form in variable
var todoForm = document.getElementById("todoAddArea");

// storing button to delete completed task in variable
var deleteCompletedButton = document.getElementById("btnDeleteCompleted");

// storing button to delete all task in variable
var deleteAllButton = document.getElementById("btnDeleteAll");

// storing key for local storage in variable
const LOCAL_STORAGE_TODO_KEY = "todo.list";

// getting data from local storage and storing as a array in variable and if no data is available, creating a blank array
var todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];

// function for form submition
todoForm.addEventListener("submit", (e) => {
	//preventin default form submission
	e.preventDefault();

	// storing input value in a constant
	const name = todoTextInput.value;

	// validating input for blank submission
	if (name == null || name === "") {
		return;
	}

	//function to creat the todo array
	const todo = creatTodo(name);

	// cleanig the input area
	todoTextInput.value = "";

	// adding the todo array at 1st position
	todoList.unshift(todo);

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
});

// function to creat todo and return as array
function creatTodo(name) {
	return { id: Date.now().toString(), todo: name, complete: false };
}

// creating p element to display date
let dateValue = document.createElement("p");

// adding current date to p element for date
dateValue.innerText = date;

// appending date element to header section
headDate.append(dateValue);

// function to diplay date in browser
function display() {
	// calling function to clear if any child element present in ul
	clearTodos(todoUl);

	// going through each object on todoList array and adding them to ul
	todoList.forEach((todo) => {
		// creating variable to add check uncheck option in checkbox
		var checked = "";

		// checking if complete in todoList object is true or false
		if (todo.complete == true) {
			checked = "checked";
		} else {
			checked = "";
		}

		//adding li element and its childrens in ul as shown below
		/**
		 * <li class="todoItem">
			<input type="checkbox" class="checkBox" id="checkBox" />
			<label for="checkBox" class="todoLabel">
				coding
			</label>
			<span class="customCheckbox"></span>
			<span class="blank"></span>
			<span id="deletebtn">X</span>
		</li>
		 */

		const htmlLi = `<li class='todoItem' id="${todo.id}">
				<input type='checkbox' class='checkBox' id="${todo.id.substring(todo.id.length - 5)}" ${checked} />
				<label contenteditable for="${todo.id.substring(todo.id.length - 5)}" class='todoLabel' onclick='taskCompleted("${todo.id}")'>${todo.todo}</label>
				<span class='customCheckbox' onclick='taskCompleted("${todo.id}")'></span>
				<span class='blank'></span>
				<span id='deletebtn' onclick='deleteTodo("${todo.id}")'>X</span>
			</li>`;
		// "<li class='todoItem' id=" +
		// todo.id +
		// ">" +
		// "<input type='checkbox' class='checkBox' id=" +
		// todo.id.substring(todo.id.length - 5) +
		// " " +
		// checked +
		// " />" +
		// "<label contenteditable for=" +
		// todo.id.substring(todo.id.length - 5) +
		// " class='todoLabel' onclick='taskCompleted(" +
		// todo.id +
		// ")'>" +
		// todo.todo +
		// "</label>" +
		// "<span class='customCheckbox'></span>" +
		// "<span class='blank'></span>" +
		// "<span id='deletebtn' onclick='deleteTodo(" +
		// todo.id +
		// ")'>X</span>" +
		// "</li>";
		const newLi = htmlLi;

		todoUl.innerHTML += newLi;
	});
}

// function to save data in local storage
function save() {
	localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todoList));
}

// function to clean child elements of ul
function clearTodos(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

// function to save todoList array in local storage and displaying in browser
function saveAndDisplay() {
	save();
	display();
}

// calling display function to display todoList in browser
display();

// toggling true and false in todoList object complete key
function taskCompleted(id) {
	var todoIndex = todoList.findIndex((todo) => todo.id == id);

	if (todoList[todoIndex].complete == false) {
		todoList[todoIndex].complete = true;
	} else {
		todoList[todoIndex].complete = false;
	}
	setTimeout(() => {
		saveAndDisplay();
	}, 500);
}

// function to delete todo
function deleteTodo(id) {
	var todoIndex = todoList.findIndex((todo) => todo.id == id);
	if (todoIndex !== -1) {
		todoList = todoList.filter(function (todo, index) {
			return index !== todoIndex;
		});
	} else {
		return;
	}

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
}

// deleting completed todos
deleteCompletedButton.addEventListener("click", () => {
	// filtering objects dont having complete as true and adding them to todoList again
	todoList = todoList.filter((item) => item.complete !== true);

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
});

// deleting all todos
deleteAllButton.addEventListener("click", () => {
	todoList = [];

	// calling function to save todoList array in local storage and displaying in browser
	saveAndDisplay();
});
