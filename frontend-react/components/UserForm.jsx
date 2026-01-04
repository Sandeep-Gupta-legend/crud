import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

function UserForm({ onUserSaved, editingUser, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;

    try {
      if (editingUser) {
        // UPDATE
        await fetch(`${API_URL}/${editingUser._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
      } else {
        // CREATE
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
      }

      setName("");
      setEmail("");
      clearEdit();
      onUserSaved();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>

     {editingUser && (
  <button type="button" className="cancel" onClick={clearEdit}>
    Cancel
  </button>
)}
    </form>
  );
}

export default UserForm;
