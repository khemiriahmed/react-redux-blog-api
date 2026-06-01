import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Create Article",
      path: "/create-article",
    },

    {
      name: "Categories",
      path: "/categories",
    },

    {
      name: "Create Category",
      path: "/create-category",
    },

    {
      name: "Profile",
      path: "/profile",
    },

    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
    },
  ];

  return (
    <div >
      <div >
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>

        <p className="text-gray-400 mt-2">Laravel + React</p>
      </div>

      <nav className="px-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-5 py-4 rounded-xl transition ${location.pathname === item.path ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
