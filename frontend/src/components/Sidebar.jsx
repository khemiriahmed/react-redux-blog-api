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
        <h1>Blog Dashboard</h1>

        <p >Laravel + React</p>
      </div>

      <nav>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
           
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
