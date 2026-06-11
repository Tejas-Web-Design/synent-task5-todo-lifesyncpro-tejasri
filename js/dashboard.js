// =========================================
// LifeSync Pro Dashboard
// =========================================

import {
  getCurrentUser,
  getTasks,
  getStreak,
  logoutUser,
  getProfileImage
} from "./storage.js";

// =========================================
// ELEMENTS
// =========================================

const welcomeUser =
document.getElementById("welcomeUser");

const professionBadge =
document.getElementById("professionBadge");

const sidebarName =
document.getElementById("sidebarName");

const sidebarProfession =
document.getElementById("sidebarProfession");

const todayDate =
document.getElementById("todayDate");

const totalTasksEl =
document.getElementById("totalTasks");

const completedTasksEl =
document.getElementById("completedTasks");

const pendingTasksEl =
document.getElementById("pendingTasks");

const streakCountEl =
document.getElementById("streakCount");

const progressPercentEl =
document.getElementById("progressPercent");

const summaryCompleted =
document.getElementById("summaryCompleted");

const summaryPending =
document.getElementById("summaryPending");

const focusText =
document.getElementById("focusText");

const logoutBtn =
document.getElementById("logoutBtn");

// =========================================
// USER CHECK
// =========================================

const user = getCurrentUser();

if (!user) {

    window.location.href =
    "login.html";

}

// =========================================
// USER DETAILS
// =========================================

sidebarName.textContent =
user.name;

sidebarProfession.textContent =
user.profession;

professionBadge.textContent =
user.profession;

welcomeUser.textContent =
`Welcome Back, ${user.name} 👋`;

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

// =========================================
// FOCUS MESSAGE
// =========================================

const professionMessages = {

Student:
"Focus on learning, revision and project work today.",

Developer:
"Complete coding tasks and push meaningful commits.",

Homemaker:
"Organize daily routines and household tasks efficiently.",

Vendor:
"Track inventory and improve customer service today.",

Freelancer:
"Deliver quality work and communicate with clients.",

Teacher:
"Prepare lessons and engage students effectively.",

Manager:
"Lead your team and monitor project progress.",

"Bank Employee":
"Complete customer requests and maintain accuracy."

};

focusText.textContent =
professionMessages[user.profession] ||
"Stay productive and achieve your goals today.";

// =========================================
// DASHBOARD STATS
// =========================================

function loadDashboardStats() {

const tasks =
getTasks(user.email) || [];

// Total Tasks

const total =
tasks.length;

// Completed

const completed =
tasks.filter(task =>
task.status === "completed" ||
task.completed === true
).length;

// Pending

const pending =
total - completed;

// Productivity %

const progress =
total === 0
? 0
: Math.round(
(completed / total) * 100
);

// Cards

totalTasksEl.textContent =
total;

completedTasksEl.textContent =
completed;

pendingTasksEl.textContent =
pending;

streakCountEl.textContent =
getStreak(user.email);

// Right Panel

summaryCompleted.textContent =
completed;

summaryPending.textContent =
pending;

// Hero Circle

progressPercentEl.textContent =
`${progress}%`;

}

// =========================================
// LOGOUT
// =========================================

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

}
);

// =========================================
// PAGE ANIMATION
// =========================================

document.addEventListener(
"DOMContentLoaded",
()=>{

document.body.style.opacity =
"0";

setTimeout(()=>{

document.body.style.transition =
"opacity .5s ease";

document.body.style.opacity =
"1";

},100);

}
);

// =========================================
// SLIDER
// =========================================

const slides =
document.querySelectorAll(".slide");

if(slides.length > 0){

let currentSlide = 0;

setInterval(()=>{

slides[currentSlide]
.classList.remove("active");

currentSlide =
(currentSlide + 1) %
slides.length;

slides[currentSlide]
.classList.add("active");

},4000);

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

// =========================================
// INITIAL LOAD
// =========================================

loadDashboardStats();