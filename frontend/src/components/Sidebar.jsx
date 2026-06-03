import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menu = [

        {
            name: "Home",
            path: "/",
            icon: "🏠"
        },

        {
            name: "Create Article",
            path: "/create-article",
            icon: "📝"
        },

        {
            name: "Categories",
            path: "/categories",
            icon: "📂"
        },

        {
            name: "Create Category",
            path: "/create-category",
            icon: "➕"
        },

        {
            name: "Profile",
            path: "/profile",
            icon: "👤"
        },

        {
            name: "Admin Dashboard",
            path: "/admin/dashboard",
            icon: "⚙️"
        }

    ];

    return (



    );

}

export default Sidebar;