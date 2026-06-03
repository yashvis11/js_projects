Todo list with local storage.

Todo list with local storage to keep the tasks in the list intact even when the webpage refreshes. 

Todo list functionalities:
Strikethrough style when task completes and is clicked
Delete button to delete the task from the list 

Implementation:
Each task consists of properties 
name, completed and id

name: to store the name of the task
completed: initially false to mark the task as not completed
strikethrough style is implemented when the task is clicked and the completed property changes to true
id: unique id to make sure that only the task whose delete button is clicked is delted, rest are saved

Event listeners: On delete button and add task button

