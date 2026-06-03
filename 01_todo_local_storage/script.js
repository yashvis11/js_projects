document.addEventListener("DOMContentLoaded", () => {
  /*Grab all the elements available */
  const todo_input = document.getElementById("todo-input");
  const todo_button = document.getElementById("add-task-btn");
  const todo_list = document.getElementById("todo-list");

  //convert the rendered tasks back to a working array using JSON.parse and the same key used in
  //JSON.stringify.
  //Use || [] for when there is no task in the array

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  /*call the render method to display the tasks on the browser, this only dispalys the old tasks
  as it only executes once when the DOM loads to display the new task type the render method inside
  the event listener*/
  tasks.forEach((task) => renderData(task));

  /*Put all the functionalities: That is start putting the code for what you would like each element to do */
  //On clicking "Add task" a task should be added, so you put an event listener on the todo_button

  todo_button.addEventListener("click", function addItem() {
    let taskInput = todo_input.value.trim();
    //to make it so that "Add task doesn't work when the input is empty"
    if (taskInput === "") return;

    /*the below approach is not useful for local storage as it can only store simple strings, like JSON.
    and will reset everytime the page is refreshed or the tab is opened.
    // const listItem = document.createElement("li");
    // listItem.textContent = task;
    // todo_list.appendChild(listItem);

    To make use of local storage we create an array storing all the tasks and make all the tasks into objects
    to give them the "completed" property.
    Cannot use add class as local storage cannot see CSS classes*/

    /*Below is the local storage solution */
    const newTask = {
      id: Date.now(),
      name: taskInput,
      completed: false,
    };
    tasks.push(newTask);
    saveLocalData(); //call the method to save the array with the new task appended
    renderData(newTask); //to render the new tasks every time the button is clicked
    //clear the text in the input after adding the task
    todo_input.value = "";
  });
  //method to save the data to local storage as a JSON string as that is the only way
  //local storage can save data without breaking it
  function saveLocalData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //the below function is used to render as well as add multiple class attributes to the li element
  function renderData(task) {
    let listItem = document.createElement("li");
    /*The below approach works but as we wish to enter different classes such as 
      li button and li we use innerHTML to add multiple elements and not just the text */
    //listItem.textContent = task.name;
    listItem.setAttribute(`taskId`, task.id);
    listItem.innerHTML = `
      <span>${task.name}</span>
      <button>delete</button>`;
    listItem.addEventListener('click', (e)=> {
      if (e.target.tagName === "BUTTON") {
        //skip if it is clicked on the button as it is supposed to delete the task 
        return;
      }
      task.completed = !task.completed; //toggle the task status for strike to appear and disappear
      saveLocalData(); //as the completed property was modified you save it again

      /*This ensures that the completed class is added when the completed is true and removed incase it is 
      false. Preventing there to be problems in case the status of the task is not in sync  */
      listItem.classList.toggle("completed", task.completed);
    })

    //event listener for deletion
    listItem.querySelector(`button`).addEventListener('click', ((e)=>{
        e.stopPropagation();
        //get only the tasks that are not deleted into the tasks array using the filter method
        
        /*here the t is each task in the array and the task.id is the specific task passed to the render 
        function. This allows hooking the event listner to each task, so that task.id is not undefined
        and works exactly where the delete button is clicked*/
        tasks = tasks.filter((t)=> t.id !== task.id)
        listItem.remove();
        saveLocalData();
    }))
    
    todo_list.appendChild(listItem); //can only append an element instead of a string directly
  }

  
})