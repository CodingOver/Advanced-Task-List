// Define UI Varibales
const form = document.getElementById('task-form');
const error = document.querySelector('.error');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task')
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');
const addBtn = document.querySelector('.add-btn');
// Load All event Listeners
loadEvenetListeners();
// Load All event Listeners
function loadEvenetListeners(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add Task Event
    form.addEventListener('submit', emptyError);
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks Event
    filter.addEventListener('keyup',filterTasks)
}
// Get Tasks From Local Storage
function getTasks(){
    let tasks;

    if (localStorage.getItem('tasks') === null){

        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function(task){
            // Create List Element
            const li = document.createElement('li');
            // Add Class 
            li.className = 'collection-item';
            // Create Text Node And Append To Li
            li.appendChild(document.createTextNode(task));
            // Create New Link Element
            const link = document.createElement('a');
            // Add CLass
            link.className = 'delete-item';
            // Add icon of Delet
            link.innerHTML = '<i class="fas fa-times-circle"></i>';
            // Append the Link to li
            li.appendChild(link);
            // Append li to ul
            taskList.appendChild(li);
        });
    }
}

function emptyError(e){
    // If Input is Empty Display Error
    if (taskInput.value === '') {
        error.style.display = 'block';
    }else{
        // Add Task Event
        addTask(e);
    }
    // If Input is On Focus Hide Error
    taskInput.onfocus = function(){
        error.style.display = 'none';
    }
    e.preventDefault();
}
// Add Task Function
function addTask(e){
    // Create List Element
    const li = document.createElement('li');
    // Add Class 
    li.className = 'collection-item';
    // Create Text Node And Append To Li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement('a');
    // Add CLass
    link.className = 'delete-item';
    // Add icon of Delet
    link.innerHTML = '<i class="fas fa-times-circle"></i>';
    // Append the Link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store Task in Local Storage
    storeTaskinLocalStorage(taskInput.value);
    // Clear Input
    taskInput.value = '';
    e.preventDefault(); 
}
// Store Task in Local Storage
function storeTaskinLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task Event
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
         if(confirm('Are You Sure?')){
                e.target.parentElement.parentElement.remove(); 
                // Remove From Local Storage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove From Local Storage 
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Task Event
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    // Clear Tasks From Local Storage
    clearTasksFromLocalStorage();
}
// Clear Tasks From Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
// FIlter Taskes
function filterTasks(e){
    const text = e.target.value.toLowerCase();   
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}