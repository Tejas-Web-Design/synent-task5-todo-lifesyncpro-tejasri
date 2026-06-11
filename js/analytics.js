// ======================================
// ANALYTICS PAGE
// LifeSync Pro
// ======================================

import {
getCurrentUser,
getTasks,
getStreak,
logoutUser,
getProfileImage
} from "./storage.js";

// ======================================
// USER CHECK
// ======================================

const user = getCurrentUser();

if(!user){

window.location.href =
"login.html";

}

// ======================================
// ELEMENTS
// ======================================

const userName =
document.getElementById(
"userName"
);

const userProfession =
document.getElementById(
"userProfession"
);

const todayDate =
document.getElementById(
"todayDate"
);

const totalTasksEl =
document.getElementById(
"totalTasks"
);

const completedTasksEl =
document.getElementById(
"completedTasks"
);

const pendingTasksEl =
document.getElementById(
"pendingTasks"
);

const streakCountEl =
document.getElementById(
"streakCount"
);

const productivityScoreEl =
document.getElementById(
"productivityScore"
);

const completionRateEl =
document.getElementById(
"completionRate"
);

const progressFill =
document.getElementById(
"progressFill"
);

const professionTitle =
document.getElementById(
"professionTitle"
);

const professionMessage =
document.getElementById(
"professionMessage"
);

const goalStatus =
document.getElementById(
"goalStatus"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
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
// LOAD TASKS
// ======================================

const tasks =
getTasks(user.email) || [];

// ======================================
// CALCULATIONS
// ======================================

const totalTasks =
tasks.length;

const completedTasks =
tasks.filter(
task => task.completed
).length;

const pendingTasks =
tasks.filter(
task => !task.completed
).length;

const streak =
getStreak(user.email);

const completionRate =
totalTasks === 0
? 0
: Math.round(
(completedTasks / totalTasks) * 100
);

// ======================================
// UPDATE UI
// ======================================

totalTasksEl.textContent =
totalTasks;

completedTasksEl.textContent =
completedTasks;

pendingTasksEl.textContent =
pendingTasks;

streakCountEl.textContent =
streak;

productivityScoreEl.textContent =
`${completionRate}%`;

completionRateEl.textContent =
`${completionRate}%`;

progressFill.style.width =
`${completionRate}%`;

// ======================================
// GOAL STATUS
// ======================================

if(completionRate >= 90){

goalStatus.textContent =
"Outstanding Performance 🏆";

}
else if(completionRate >= 70){

goalStatus.textContent =
"Great Progress 🚀";

}
else if(completionRate >= 40){

goalStatus.textContent =
"Keep Going 💪";

}
else{

goalStatus.textContent =
"Let's Start Strong ⚡";

}

// ======================================
// PROFESSION INSIGHTS
// ======================================

professionTitle.textContent =
user.profession;

const insights = {

Student:
"Focus on learning, revision and project building every day.",

Developer:
"Consistent coding and project work improve development skills.",

Homemaker:
"Balanced routines help maintain productivity and family wellbeing.",

Freelancer:
"Client communication and timely delivery drive success.",

Vendor:
"Inventory management and customer satisfaction improve business growth.",

Teacher:
"Lesson planning and student engagement increase effectiveness.",

Manager:
"Leadership, planning and team coordination are key to success.",

"Bank Employee":
"Accuracy and customer service build trust and efficiency."

};

professionMessage.textContent =
insights[user.profession]
||
"Stay productive and achieve your goals every day.";

// ======================================
// ANIMATE SCORE
// ======================================

function animateValue(
element,
start,
end,
duration
){

let startTime = null;

function animation(currentTime){

if(!startTime){

startTime = currentTime;

}

const progress =
Math.min(
(currentTime - startTime)
/
duration,
1
);

const value =
Math.floor(
progress *
(end - start)
+
start
);

element.textContent =
`${value}%`;

if(progress < 1){

requestAnimationFrame(
animation
);

}

}

requestAnimationFrame(
animation
);

}

animateValue(
productivityScoreEl,
0,
completionRate,
1200
);

animateValue(
completionRateEl,
0,
completionRate,
1200
);

// ======================================
// ACHIEVEMENTS
// ======================================

const achievements =
document.querySelectorAll(
".achievement"
);

if(completedTasks >= 5){

achievements[1].style.border =
"2px solid #22c55e";

}

if(streak >= 3){

achievements[0].style.border =
"2px solid #f59e0b";

}

if(completionRate >= 80){

achievements[2].style.border =
"2px solid #2563eb";

}

if(completionRate === 100){

achievements[3].style.border =
"2px solid #8b5cf6";

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
"Are you sure you want to logout?"
);

if(confirmLogout){

logoutUser();

window.location.href =
"login.html";

}

}
);

// ======================================
// PAGE LOAD ANIMATION
// ======================================

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

});
