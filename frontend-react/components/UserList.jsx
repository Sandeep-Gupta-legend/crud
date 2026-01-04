const API_URL = "http://localhost:5000/api/users";

function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
  <div className="user-info">
    <strong>{user.name}</strong> <br />
    {user.email}
  </div>

  <div className="actions">
    <button className="edit" onClick={() => onEdit(user)}>
      Edit
    </button>
    <button className="delete" onClick={() => onDelete(user._id)}>
      Delete
    </button>
  </div>
</li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
