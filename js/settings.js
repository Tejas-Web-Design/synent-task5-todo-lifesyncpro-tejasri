// ======================================
// SETTINGS PAGE
// LifeSync Pro
// ======================================

import {
getCurrentUser,
updateUser,
logoutUser,
saveTheme,
getTheme,
saveProfileImage,
getProfileImage,
deleteAccount
}
from "./storage.js";

// ======================================
// ELEMENTS
// ======================================

const nameInput =
document.getElementById("name");

const emailInput =
document.getElementById("email");

const professionInput =
document.getElementById("profession");

const passwordInput =
document.getElementById("password");

const saveBtn =
document.getElementById("saveBtn");

const profileImageInput =
document.getElementById("profileImage");

const profilePreview =
document.getElementById("profilePreview");

const themeToggle =
document.getElementById("themeToggle");

const joinedDate =
document.getElementById("joinedDate");

const currentProfession =
document.getElementById("currentProfession");

const deleteAccountBtn =
document.getElementById("deleteAccountBtn");

const logoutBtn =
document.getElementById("logoutBtn");

// ======================================
// USER CHECK
// ======================================

let user =
getCurrentUser();

if (!user) {

window.location.href =
"login.html";

}

// ======================================
// LOAD USER DATA
// ======================================

function loadUserData() {

nameInput.value =
user.name || "";

emailInput.value =
user.email || "";

professionInput.value =
user.profession || "";

joinedDate.textContent =
user.joinedAt ||
new Date().toLocaleDateString("en-IN");

currentProfession.textContent =
user.profession || "-";

// Profile Image

const savedImage =
getProfileImage(
user.email
);

if(savedImage){

profilePreview.src =
savedImage;

}
else{

profilePreview.src =
"../assets/propic.png";

}

}

loadUserData();

// ======================================
// PROFILE IMAGE UPLOAD
// ======================================

profileImageInput.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload =
function(){

profilePreview.src =
reader.result;

saveProfileImage(
user.email,
reader.result
);

};

reader.readAsDataURL(file);

}
);

// ======================================
// SAVE PROFILE
// ======================================

saveBtn.addEventListener(
"click",
()=>{

const name =
nameInput.value.trim();

const email =
emailInput.value.trim();

const profession =
professionInput.value;

const password =
passwordInput.value.trim();

if(!name || !email){

alert(
"Please fill all required fields."
);

return;

}

const updatedUser = {

...user,

name,
email,
profession,

password:
password || user.password

};

// update existing user

updateUser(
updatedUser
);

// update current session

localStorage.setItem(
"lifesync_current_user",
JSON.stringify(updatedUser)
);

user =
updatedUser;

currentProfession.textContent =
profession;

alert(
"Profile Updated Successfully ✅"
);

}
);

// ======================================
// THEME
// ======================================

const savedTheme =
getTheme(
user.email
);

if(savedTheme === "dark"){

document.body.classList.add(
"dark"
);

themeToggle.checked = true;

}

themeToggle.addEventListener(
"change",
()=>{

if(themeToggle.checked){

document.body.classList.add(
"dark"
);

saveTheme(
user.email,
"dark"
);

}
else{

document.body.classList.remove(
"dark"
);

saveTheme(
user.email,
"light"
);

}

}
);

// ======================================
// DELETE ACCOUNT
// ======================================

deleteAccountBtn.addEventListener(
"click",
()=>{

const confirmDelete =
confirm(
"Delete account permanently?"
);

if(!confirmDelete) return;

deleteAccount(
user.email
);

alert(
"Account Deleted Successfully"
);

window.location.href =
"register.html";

}
);

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

}
);