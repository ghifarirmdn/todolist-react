import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl mb-4">
        <Link to="/dashboard">Dashboard</Link>
      </h1>
      <ul>
        <Link to="/dashboard">
          <li className="mb-2">Home</li>
        </Link>
        <Link to="/dashboard/todolist">
          <li className="mb-2">Todo List</li>
        </Link>
        <li>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
