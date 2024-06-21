import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo({
      title: newTodo,
      status: "progress",
    });
    setNewTodo("");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ToDo List</h2>
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="p-2 border-b text-center">{todo.id}</td>
                <td className="p-2 border-b text-center">{todo.title}</td>
                <td className="p-2 border-b text-center">
                  <select
                    value={todo.status}
                    onChange={(e) =>
                      updateTodo({ ...todo, status: e.target.value })
                    }
                    className="p-1 border border-gray-300 rounded"
                  >
                    <option value="progress">Progress</option>
                    <option value="done">Done</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="p-2 border-b text-center">
                  <button
                    className="p-1 bg-red-500 text-white rounded"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
