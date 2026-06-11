// ======================================
// LifeSync Pro Storage Manager
// ======================================

const STORAGE_KEYS = {

    USERS: "lifesync_users",

    CURRENT_USER: "lifesync_current_user"

};

// ======================================
// USER MANAGEMENT
// ======================================

export function saveUser(user) {

    const users = getUsers();

    const existingIndex =
    users.findIndex(
        u => u.email === user.email
    );

    if(existingIndex !== -1){

        users[existingIndex] = user;

    }else{

        users.push(user);

    }

    localStorage.setItem(
        STORAGE_KEYS.USERS,
        JSON.stringify(users)
    );

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(user)
    );

}

export function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.USERS
        )
    ) || [];

}

export function getUserByEmail(email) {

    const users = getUsers();

    return users.find(
        user =>
            user.email.toLowerCase() ===
            email.toLowerCase()
    );

}

export function emailExists(email) {

    return !!getUserByEmail(email);

}

export function updateUser(updatedUser) {

    const users = getUsers();

    const newUsers = users.map(user =>

        user.email === updatedUser.email
            ? updatedUser
            : user

    );

    localStorage.setItem(
        STORAGE_KEYS.USERS,
        JSON.stringify(newUsers)
    );

}

export function deleteUser(email) {

    const users = getUsers();

    const filteredUsers = users.filter(
        user =>
            user.email !== email
    );

    localStorage.setItem(
        STORAGE_KEYS.USERS,
        JSON.stringify(filteredUsers)
    );

}

// ======================================
// LOGIN SESSION
// ======================================

export function loginUser(user) {

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(user)
    );

}

export function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            STORAGE_KEYS.CURRENT_USER
        )
    );

}

export function logoutUser() {

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_USER
    );

}

// ======================================
// TASK STORAGE
// ======================================

export function saveTasks(email, tasks) {

    localStorage.setItem(
        `tasks_${email}`,
        JSON.stringify(tasks)
    );

}

export function getTasks(email) {

    return JSON.parse(
        localStorage.getItem(
            `tasks_${email}`
        )
    ) || [];

}

export function deleteTasks(email) {

    localStorage.removeItem(
        `tasks_${email}`
    );

}

// ======================================
// STREAK STORAGE
// ======================================

export function saveStreak(email, streak) {

    localStorage.setItem(
        `streak_${email}`,
        streak
    );

}

export function getStreak(email) {

    return Number(
        localStorage.getItem(
            `streak_${email}`
        )
    ) || 0;

}

export function updateDailyStreak(email){

const today =
new Date().toDateString();

const lastDate =
localStorage.getItem(
`last_completed_${email}`
);

let streak =
getStreak(email);

if(!lastDate){

streak = 1;

saveStreak(
email,
streak
);

localStorage.setItem(
`last_completed_${email}`,
today
);

return streak;

}

const last =
new Date(lastDate);

const current =
new Date(today);

const diffDays =
Math.floor(
(current - last) /
(1000 * 60 * 60 * 24)
);

if(diffDays === 1){

streak++;

saveStreak(
email,
streak
);

localStorage.setItem(
`last_completed_${email}`,
today
);

}

else if(diffDays > 1){

streak = 1;

saveStreak(
email,
streak
);

localStorage.setItem(
`last_completed_${email}`,
today
);

}

return streak;

}

// ======================================
// THEME STORAGE
// ======================================

export function saveTheme(email, theme) {

    localStorage.setItem(
        `theme_${email}`,
        theme
    );

}

export function getTheme(email) {

    return localStorage.getItem(
        `theme_${email}`
    ) || "light";

}

// ======================================
// TASK STATISTICS
// ======================================

export function getTaskStats(email) {

    const tasks =
        getTasks(email);

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    return {

        total,
        completed,
        pending,
        percentage

    };

}

// ======================================
// RESET USER DATA
// ======================================

export function resetUserData(email) {

    deleteTasks(email);

    localStorage.removeItem(
        `streak_${email}`
    );

    localStorage.removeItem(
        `theme_${email}`
    );

}

// ======================================
// DELETE ACCOUNT
// ======================================

export function deleteAccount(email) {

    resetUserData(email);

    deleteUser(email);

    logoutUser();

}

// Current User

export function getUser() {

    return getCurrentUser();

}

// ======================================
// PROFILE IMAGE STORAGE
// ======================================

export function saveProfileImage(email, image) {

    localStorage.setItem(
        `profile_${email}`,
        image
    );

}

export function getProfileImage(email) {

    return localStorage.getItem(
        `profile_${email}`
    );

}