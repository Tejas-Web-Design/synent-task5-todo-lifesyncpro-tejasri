
// ======================================
// LifeSync Pro Authentication
// ======================================

import {
saveUser,
getUserByEmail,
emailExists,
loginUser,
saveTasks,
saveStreak,
saveTheme,
getTheme,
getCurrentUser
} from "./storage.js";

import {
generateDefaultTasks
} from "./defaultTasksTemplates.js";

console.log("AUTH JS LOADED");

// ======================================
// CURRENT USER
// ======================================

const currentUser =
getCurrentUser();

// ======================================
// REDIRECT IF ALREADY LOGGED IN
// ======================================

if (
currentUser &&
(
window.location.pathname.includes("login.html") ||
window.location.pathname.includes("register.html")
)
) {

window.location.href =
"./dashboard.html";

}

// ======================================
// PASSWORD TOGGLE
// ======================================

const togglePassword =
document.getElementById(
"togglePassword"
);

const passwordField =
document.getElementById(
"password"
);

if (
togglePassword &&
passwordField
) {

togglePassword.addEventListener(
"click",
() => {

if (
passwordField.type ===
"password"
) {

passwordField.type =
"text";

togglePassword.innerHTML =
'<i class="fa-solid fa-eye-slash"></i>';

}
else {

passwordField.type =
"password";

togglePassword.innerHTML =
'<i class="fa-solid fa-eye"></i>';

}

}
);

}

// ======================================
// PASSWORD STRENGTH
// ======================================

const strengthBar =
document.getElementById(
"strengthBar"
);

const strengthText =
document.getElementById(
"strengthText"
);

if (
passwordField &&
strengthBar &&
strengthText
) {

passwordField.addEventListener(
"input",
() => {

const value =
passwordField.value;

let strength = 0;

if (
value.length >= 8
) strength++;

if (
/[A-Z]/.test(value)
) strength++;

if (
/[0-9]/.test(value)
) strength++;

if (
/[!@#$%^&*]/.test(value)
) strength++;

const widths =
["0%", "25%", "50%", "75%", "100%"];

const colors = [
"#e5e7eb",
"#ef4444",
"#f59e0b",
"#3b82f6",
"#22c55e"
];

const labels = [
"Password Strength",
"Weak Password",
"Medium Password",
"Good Password",
"Strong Password"
];

strengthBar.style.width =
widths[strength];

strengthBar.style.background =
colors[strength];

strengthText.innerText =
labels[strength];

}
);

}

// ======================================
// REGISTER
// ======================================

const registerForm =
document.getElementById(
"registerForm"
);

if (registerForm) {

registerForm.addEventListener(
"submit",
(e) => {

e.preventDefault();

console.log(
"REGISTER CLICKED"
);

const name =
document.getElementById(
"name"
).value.trim();

const email =
document.getElementById(
"email"
).value.trim();

const profession =
document.getElementById(
"profession"
).value;

const password =
document.getElementById(
"password"
).value;

const confirmPassword =
document.getElementById(
"confirmPassword"
).value;

// Validation

if (
!name ||
!email ||
!profession ||
!password ||
!confirmPassword
) {

alert(
"Please fill all fields"
);

return;

}

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
!emailPattern.test(email)
) {

alert(
"Please enter a valid email"
);

return;

}

if (
password !== confirmPassword
) {

alert(
"Passwords do not match"
);

return;

}

if (
password.length < 8
) {

alert(
"Password must be at least 8 characters"
);

return;

}

if (
emailExists(email)
) {

alert(
"This email is already registered"
);

return;

}

// User Object

const user = {

id: Date.now(),

name,

email,

profession,

password,

profilePic: "",

bio: "",

joinedAt:
new Date()
.toLocaleDateString(),

createdAt:
new Date()
.toISOString()

};

// Save User

saveUser(user);

// Generate Default Tasks

const tasks =
generateDefaultTasks(
profession
);

saveTasks(
email,
tasks
);

// Initial Streak

saveStreak(
email,
0
);

alert(
"🎉 Registration Successful"
);

registerForm.reset();

setTimeout(
() => {

window.location.href =
"./login.html";

},
500
);

}
);

}

// ======================================
// LOGIN
// ======================================

const loginForm =
document.getElementById(
"loginForm"
);

if (loginForm) {

loginForm.addEventListener(
"submit",
(e) => {

e.preventDefault();

console.log(
"LOGIN CLICKED"
);

const email =
document.getElementById(
"email"
).value.trim();

const password =
document.getElementById(
"password"
).value;

const user =
getUserByEmail(
email
);

if (
user &&
user.password === password
) {

loginUser(
user
);

alert(
`Welcome Back ${user.name} 🚀`
);

setTimeout(
() => {

window.location.href =
"./dashboard.html";

},
500
);

}
else {

alert(
"Invalid Email or Password"
);

}

}
);

}

// ======================================
// FORGOT PASSWORD
// ======================================

const forgotForm =
document.getElementById(
"forgotForm"
);

if (forgotForm) {

forgotForm.addEventListener(
"submit",
(e) => {

e.preventDefault();

const email =
document.getElementById(
"forgotEmail"
).value.trim();

const user =
getUserByEmail(
email
);

if (user) {

alert(
`Password: ${user.password}`
);

window.location.href =
"./login.html";

}
else {

alert(
"No account found with this email"
);

}

}
);

}

// ======================================
// THEME SUPPORT
// ======================================

if (currentUser) {

const savedTheme =
getTheme(
currentUser.email
);

if (
savedTheme === "dark"
) {

document.body.classList.add(
"dark"
);

}

const themeBtn =
document.getElementById(
"themeBtn"
);

if (themeBtn) {

themeBtn.addEventListener(
"click",
() => {

document.body.classList.toggle(
"dark"
);

const theme =
document.body.classList.contains(
"dark"
)
? "dark"
: "light";

saveTheme(
currentUser.email,
theme
);

}
);

}

}

// ======================================
// PAGE ANIMATION
// ======================================

document.addEventListener(
"DOMContentLoaded",
() => {

document.body.style.opacity =
"0";

setTimeout(
() => {

document.body.style.transition =
"opacity .5s ease";

document.body.style.opacity =
"1";

},
100
);

}
);

