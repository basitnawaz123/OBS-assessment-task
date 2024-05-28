import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const Users = () => {
  let [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
