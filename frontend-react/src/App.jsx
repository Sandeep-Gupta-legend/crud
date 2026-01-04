import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/userlist";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  return (
    <div className="app">
      <h1>CRUD App (React)</h1>

      <UserForm
        onUserSaved={fetchUsers}
        editingUser={editingUser}
        clearEdit={() => setEditingUser(null)}
      />

      <UserList
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
