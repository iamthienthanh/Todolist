// ---------------Add a to do-------------------
const toDoList = document.querySelector('.list');
const input = document.querySelector('input');
const addButton = document.querySelector('.add-item i');
const CHECK = "fa-circle-check";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";
let List;
let id;
// get List 
data=localStorage.getItem("TODO");
if (data) {
    List = JSON.parse(data);
    id = List.length;
    loadList(List);
} else {
    List = [];
    id = 0;
}
function loadList(arr) {
    arr.forEach(function(item){
        addToDo(item.task, item.id, item.done, item.trash);
    });
}
//--------------


function addToDo(toDo, id, done, trash) {
    if (trash) {return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    
    toDoList.innerHTML += `<li class="item">
                <i class="fa-regular ${DONE}" job="complete" id="${id}"></i>
                <p class="text ${LINE}"><label for="${id}">${toDo}</label></p>
                <i class="fa-regular fa-trash-can" job="delete" id="${id}"></i>
            </li>`;
}
function EnterInputTodo(event) {
    if (event.keyCode == "13") {
        const toDo = input.value;
        if (toDo){
            addToDo(toDo, id ,false, false);
            input.value = "";
            List.push({
                task: toDo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem("TODO", JSON.stringify(List));
            id++;
        }
    }

}
function clickInputTodo() {
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo, id, false, false);
        input.value = "";
        List.push({
            task: toDo,
            id: id,
            done: false,
            trash: false
        })
        localStorage.setItem("TODO", JSON.stringify(List));
        id++;
    }
}
input.addEventListener('keyup',EnterInputTodo);
addButton.addEventListener('click',clickInputTodo);
// -------------------------------------------

// -------------Clear All To Do--------------
const clear = document.querySelector('.clear');
function clearAllToDo() {
    localStorage.clear();
    location.reload();
    
}
clear.addEventListener('click',clearAllToDo);
// ---------------------------------------------

//---------------Date---------------
var today = new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayweek = document.querySelector('.dayweek');
const month = document.querySelector('.month');
const day = document.querySelector('.day');
const year = document.querySelector('.year');
dayweek.innerText = days[today.getDay()];
month.innerText = months[today.getMonth()];
day.innerText = today.getDate();
year.innerText = today.getFullYear();

//----------------COMPLETE TO DO ---------------
list = document.querySelector('.list');
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    List[element.id].done = List[element.id].done ? false : true;
}
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
}
list.addEventListener('click',function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    }
    if (elementJob == "delete") {
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(List));
})

 

