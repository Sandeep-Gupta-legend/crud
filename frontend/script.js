const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const API_URL = "http://localhost:5000/api/users";

let editingUserId = null;

/* =========================
   FETCH USERS (READ)
========================= */
async function fetchUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();

    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${user.name}</strong> - ${user.email}
            <button onclick="editUser('${user._id}', '${user.name}', '${user.email}')">Edit</button>
            <button onclick="deleteUser('${user._id}')">Delete</button>
        `;

        userList.appendChild(li);
    });
}

/* =========================
   CREATE / UPDATE USER
========================= */
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
    };

    if (editingUserId) {
        // UPDATE
        await fetch(`${API_URL}/${editingUserId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        editingUserId = null;
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
    }

    form.reset();
    fetchUsers();
});

/* =========================
   EDIT USER
========================= */
function editUser(id, name, email) {
    editingUserId = id;
    nameInput.value = name;
    emailInput.value = email;
}

/* =========================
   DELETE USER
========================= */
async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    fetchUsers();
}

/* =========================
   INITIAL LOAD
========================= */
fetchUsers();
