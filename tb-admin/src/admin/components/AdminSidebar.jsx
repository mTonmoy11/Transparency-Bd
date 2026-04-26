import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Manage Users" },
    { path: "/admin/admins", label: "Manage Admins" },
    { path: "/admin/reports", label: "Manage Reports" },
    { path: "/admin/cases", label: "Manage Cases" },
    { path: "/admin/heatmap", label: "Corruption Statistics" },
  ];

  // Detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setIsOpen(false);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden top-4 left-4 z-50 btn btn-circle btn-sm btn-primary shadow-lg"
      >
        {isOpen ? (
          <span className="material-icons">close</span>
        ) : (
          <span className="material-icons">menu</span>
        )}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="w-64 h-full bg-base-200 flex flex-col border-r border-base-300 shadow-xl">
          {/* Logo Section */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-primary">
                Transparency Bangladesh
              </h1>
            </div>
          </div>

          {/* Navigation Items */}
          <ul className="menu p-4 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <li key={item.path} className="my-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-300"
                    }`
                  }
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <span className="material-icons text-xl">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Collapse Indicator */}
          <div className="p-4 border-t border-base-300 text-center hidden lg:block">
            <span className="text-xs opacity-70">
              {isOpen ? "Click icon to collapse" : "Sidebar collapsed"}
            </span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
