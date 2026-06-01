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


}

export default Sidebar;
