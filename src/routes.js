import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext.js";
import { TodoProvider } from "./context/TodoContext.js";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TodoList from "./pages/TodoList.jsx";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const DashboardLayout = () => (
  <div className="flex">
    <Dashboard />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
);

const AppRoutes = () => (
  <Router>
    <AuthProvider>
      <TodoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={<PrivateRoute element={<DashboardLayout />} />}
          >
            <Route path="todolist" element={<TodoList />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </TodoProvider>
    </AuthProvider>
  </Router>
);

export default AppRoutes;
