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

        <aside
            className="fixed left-0 top-0 h-screen w-72 bg-gray-900 text-white shadow-2xl flex flex-col">

            {/* HEADER */}

            <div className="p-8 border-b border-gray-800">

                <h1 className="text-3xl font-bold">

                    Blog Dashboard

                </h1>

                <p className="text-gray-400 mt-2">

                    Laravel + React

                </p>

            </div>

            {/* MENU */}

            <nav className="flex-1 p-4 overflow-y-auto">

                <div className="space-y-2">

                    {

                        menu.map((item) => (

                            <Link

                                key={item.path}

                                to={item.path}

                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${location.pathname === item.path? "bg-blue-600 shadow-lg":"text-gray-300 hover:bg-gray-800 hover:text-white"}`}>

                                <span className="text-xl">

                                    {item.icon}

                                </span>

                                <span>

                                    {item.name}

                                </span>

                            </Link>

                        ))

                    }

                </div>

            </nav>

            {/* FOOTER */}

            <div className="p-6 border-t border-gray-800">

                <p className="text-sm text-gray-400">

                    Dashboard v1.0

                </p>

            </div>

        </aside>

    );

}

export default Sidebar;