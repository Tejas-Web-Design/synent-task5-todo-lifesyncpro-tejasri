
// ======================================
// TASKS PAGE
// LifeSync Pro
// ======================================

import {
getCurrentUser,
getTasks,
saveTasks,
logoutUser,
updateDailyStreak,
getProfileImage
} from "./storage.js";

// ======================================
// ELEMENTS
// ======================================

const userName =
document.getElementById("userName");

const userProfession =
document.getElementById("userProfession");

const todayDate =
document.getElementById("todayDate");

const taskInput =
document.getElementById("taskInput");

const prioritySelect =
document.getElementById("priority");

const addTaskBtn =
document.getElementById("addTaskBtn");

const searchTask =
document.getElementById("searchTask");

const logoutBtn =
document.getElementById("logoutBtn");

const taskList =
document.getElementById("taskList");

const totalTasksEl =
document.getElementById("totalTasks");

const pendingTasksEl =
document.getElementById("pendingTasks");



const completedTasksEl =
document.getElementById("completedTasks");

const productivityScoreEl =
document.getElementById("productivityScore");

// ======================================
// USER CHECK
// ======================================

const user = getCurrentUser();

if(!user){

window.location.href =
"login.html";

}

updateDailyStreak(
user.email
);

// ======================================
// USER INFO
// ======================================

userName.textContent =
user.name;

userProfession.textContent =
user.profession;

todayDate.textContent =
new Date().toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

// ======================================
// TASKS
// ======================================

let tasks =
getTasks(user.email) || [];

let currentFilter =
"all";

// ======================================
// RENDER TASKS
// ======================================

function renderTasks(){

taskList.innerHTML = "";

let filteredTasks =
[...tasks];

// Search

const searchValue =
searchTask.value
.toLowerCase()
.trim();

if(searchValue){

filteredTasks =
filteredTasks.filter(task =>
task.title
.toLowerCase()
.includes(searchValue)
);

}

// Filter

if(currentFilter === "active"){

filteredTasks =
filteredTasks.filter(
task => !task.completed
);

}

if(currentFilter === "completed"){

filteredTasks =
filteredTasks.filter(
task => task.completed
);

}

// Empty State

if(filteredTasks.length === 0){

taskList.innerHTML = `

<div class="empty-task">

No Tasks Found 🚀

</div>

`;

updateStats();

return;

}

// Render Tasks

filteredTasks.forEach(task => {

const taskItem =
document.createElement("div");

taskItem.className =
"task-item";

taskItem.innerHTML = `

<div class="task-left">

<input
type="checkbox"
class="task-checkbox"
data-id="${task.id}"
${task.completed ? "checked" : ""}>

<span class="
task-title
${task.completed ? "completed" : ""}
">

${task.title}

</span>

</div>

<div class="task-right">

<span class="
priority
${(task.priority || "Medium").toLowerCase()}
">

${task.priority || "Medium"}

</span>

<button
class="delete-btn"
data-id="${task.id}">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

taskList.appendChild(taskItem);

});

attachTaskEvents();

updateStats();

}

// ======================================
// TASK EVENTS
// ======================================

function attachTaskEvents(){

// Complete Task

document
.querySelectorAll(".task-checkbox")
.forEach(box => {

box.addEventListener(
"change",
()=>{

const taskId =
Number(
box.dataset.id
);

tasks =
tasks.map(task => {

if(task.id === taskId){

task.completed =
!task.completed;

}

return task;

});

saveTasks(
user.email,
tasks
);

renderTasks();

});

});

// Delete Task

document
.querySelectorAll(".delete-btn")
.forEach(btn => {

btn.addEventListener(
"click",
()=>{

const taskId =
Number(
btn.dataset.id
);

tasks =
tasks.filter(
task =>
task.id !== taskId
);

saveTasks(
user.email,
tasks
);

renderTasks();

});

});

}

// ======================================
// ADD TASK
// ======================================

addTaskBtn.addEventListener(
"click",
()=>{

const title =
taskInput.value.trim();

if(!title){

alert(
"Enter a task"
);

return;

}

const task = {

id: Date.now(),

title,

priority:
prioritySelect.value,

completed:false

};

tasks.push(task);

saveTasks(
user.email,
tasks
);

taskInput.value = "";

renderTasks();

}
);

// Enter Key

taskInput.addEventListener(
"keypress",
(e)=>{

if(e.key==="Enter"){

addTaskBtn.click();

}

});

// ======================================
// SEARCH
// ======================================

searchTask.addEventListener(
"input",
renderTasks
);

// ======================================
// FILTERS
// ======================================

const filterButtons =
document.querySelectorAll(
".filter-btn"
);

filterButtons.forEach(btn => {

btn.addEventListener(
"click",
()=>{

filterButtons.forEach(
button =>
button.classList.remove(
"active"
)
);

btn.classList.add(
"active"
);

currentFilter =
btn.dataset.filter;

renderTasks();

});

});

// ======================================
// STATS
// ======================================

function updateStats(){

const total =
tasks.length;

const completed =
tasks.filter(
task => task.completed
).length;

const pending =
total - completed;

totalTasksEl.textContent =
total;

pendingTasksEl.textContent =
pending;



completedTasksEl.textContent =
completed;

const score =
total === 0
? 0
: Math.round(
(completed / total) * 100
);

productivityScoreEl.textContent =
`${score}%`;

}

// PROFILE IMAGE
const avatar =
document.getElementById(
"profileAvatar"
);

const savedImage =
getProfileImage(
user.email
);

if(
avatar &&
savedImage
){

avatar.src =
savedImage;

}

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener(
"click",
()=>{

const confirmLogout =
confirm(
"Logout from LifeSync Pro?"
);

if(confirmLogout){

logoutUser();

window.location.href =
"login.html";

}

});

// ======================================
// INITIAL LOAD
// ======================================

renderTasks();

