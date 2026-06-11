import {
getCurrentUser,
getTasks,
getStreak,
logoutUser,
saveProfileImage,
getProfileImage
}
from "./storage.js";

// ======================================
// USER
// ======================================

const user =
getCurrentUser();

if(!user){

window.location.href =
"login.html";

}

// ======================================
// ELEMENTS
// ======================================

const profileName =
document.getElementById(
"profileName"
);

const profileProfession =
document.getElementById(
"profileProfession"
);

const userName =
document.getElementById(
"userName"
);

const userEmail =
document.getElementById(
"userEmail"
);

const userProfession =
document.getElementById(
"userProfession"
);

const joinedDate =
document.getElementById(
"joinedDate"
);

const profileStreak =
document.getElementById(
"profileStreak"
);

const streakCount =
document.getElementById(
"streakCount"
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

const productivityScore =
document.getElementById(
"productivityScore"
);

const goalMessage =
document.getElementById(
"goalMessage"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

const profileImage =
document.getElementById(
"profileImage"
);

const profileUpload =
document.getElementById(
"profileUpload"
);

// ======================================
// USER DETAILS
// ======================================

profileName.textContent =
user.name;

profileProfession.textContent =
user.profession;

userName.textContent =
user.name;

userEmail.textContent =
user.email;

userProfession.textContent =
user.profession;

joinedDate.textContent =
user.createdAt ||
new Date().toLocaleDateString(
"en-IN"
);

// ======================================
// PROFILE IMAGE
// ======================================

const savedImage =
getProfileImage(user.email);

if(savedImage){

    profileImage.src =
    savedImage;

}

profileUpload.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file) return;

const img =
new Image();

img.onload = () => {

    const canvas =
    document.createElement(
    "canvas"
    );

    canvas.width = 150;
    canvas.height = 150;

    const ctx =
    canvas.getContext("2d");

    ctx.drawImage(
        img,
        0,
        0,
        150,
        150
    );

    const compressed =
    canvas.toDataURL(
        "image/jpeg",
        0.5
    );

    profileImage.src =
    compressed;

    saveProfileImage(
        user.email,
        compressed
    );

};

img.src =
URL.createObjectURL(file);

});


// ======================================
// TASK STATS
// ======================================

const tasks =
getTasks(user.email) || [];

const totalTasks =
tasks.length;

const completedTasks =
tasks.filter(
task => task.completed
).length;

const pendingTasks =
totalTasks -
completedTasks;

const streak =
getStreak(
user.email
);

const score =
totalTasks === 0
? 0
: Math.round(
(completedTasks / totalTasks)

* 100
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

streakCount.textContent =
streak;

profileStreak.textContent =
`${streak} Days`;

productivityScore.textContent =
`${score}%`;

// ======================================
// GOAL MESSAGE
// ======================================

if(score >= 90){

goalMessage.textContent =
"Outstanding Performance 🏆";

}
else if(score >= 70){

goalMessage.textContent =
"Great Progress 🚀";

}
else if(score >= 40){

goalMessage.textContent =
"Keep Going 💪";

}
else{

goalMessage.textContent =
"Stay Consistent 🚀";

}

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener(
"click",
()=>{

if(confirm(
"Logout from LifeSync Pro?"
)){

logoutUser();

window.location.href =
"login.html";

}

});