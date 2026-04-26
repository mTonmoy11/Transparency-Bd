import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../admin/layouts/AdminLaout";
import Dashboard from "../admin/pages/Dashboard";
import ManageUsers from "../admin/pages/ManageUsers";
import ManageAdmins from "../admin/pages/ManageAdmins";
import ManageReports from "../admin/pages/ManageReports";
import ManageCases from "../admin/pages/ManageCases";
import ManageHeatmap from "../admin/pages/ManageHeatmap";
import AdminLoginPage from "../components/AdminLoginPage";

const RequireAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const adminUser = localStorage.getItem("adminUser");

  if (!isAdmin || !adminUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "admins", element: <ManageAdmins /> },
      { path: "reports", element: <ManageReports /> },
      { path: "cases", element: <ManageCases /> },
      { path: "heatmap", element: <ManageHeatmap /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin/dashboard" replace />,
  },
]);
