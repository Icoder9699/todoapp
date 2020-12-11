const form = document.getElementById('form');
const input = document.querySelector('.form__input');
const createBtn = document.getElementById('create');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.form__close');
const todoList = document.querySelector('.todos');
const countEl = document.querySelector('.todos__count');

createBtn.addEventListener('click', () => {
    overlay.style.display = "block";
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = "none";
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createTodo();
    updateLS();
});

// полчуаем тодошки с LS 
const tasksFrLS = JSON.parse(localStorage.getItem('todos'));

tasksFrLS.forEach(todo => {
    createTodo(todo);
});


function createTodo(todo){
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }
    if(todoText){
        todoList.style.opacity = '1';
    
        const task = document.createElement('div');
        const taskInner = document.createElement('div');
        const taskDone = document.createElement('div');
        const taskDelete = document.createElement('div');

        task.classList.add('task');
        taskInner.classList.add('task__inner');
        taskDone.classList.add('task__done');
        taskDelete.classList.add('task__delete');

        taskInner.innerText = todoText;
        taskDone.setAttribute('type', 'checkbox');
        taskDone.innerHTML = `
            <input type="checkbox">
        `;
        taskDelete.innerHTML = `
            &times;
        `;

        task.append(taskDone);
        task.append(taskInner);
        task.append(taskDelete);

        taskDelete.addEventListener('click', () => {
            taskDelete.parentNode.remove();
            updateLS();
            countTasks();
        });

        if(todo && todo.completed){
            taskInner.classList.add('completed'); 
            taskDone.querySelector('input').checked = true;
        }

        taskDone.addEventListener('change', () => {
            taskDone.nextElementSibling.classList.toggle('completed');  
            updateLS();
            countTasks();
        });

        todoList.appendChild(task);
        countTasks();
    }
    form.reset();

}


function updateLS(){
    const tasks = document.querySelectorAll('.task__inner');
    const taskLs = [];

    tasks.forEach(task => {
        taskLs.push({
            text: task.innerText,
            completed: task.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(taskLs));
}

function countTasks(){
    const tasks = document.querySelectorAll('.task__inner');
    const tasksDone = document.querySelectorAll('.completed');

    if(tasks.length === 0){
        todoList.style.opacity = '0';
    }
   if(tasks.length > 1){
        countEl.innerHTML = `
        You have ${tasks.length} tasks for today,  ${tasksDone.length} of them done`;
   }else {
        countEl.innerHTML = `
        You have ${tasks.length} task for today,  ${tasksDone.length} of them done`;
   }
}
