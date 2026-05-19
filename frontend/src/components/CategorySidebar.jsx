// import { useEffect } from "react";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import { fetchCategories } from "../features/categories/categorySlice";

// function CategorySidebar({
//   selectedCategory,
//   setSelectedCategory,
// }) {
//   const dispatch = useDispatch();

//   /*
//   |--------------------------------------------------------------------------
//   | REDUX STATE
//   |--------------------------------------------------------------------------
//   */
//   const { categories } = useSelector(
//     (state) => state.categories
//   );

//   /*
//   |--------------------------------------------------------------------------
//   | FETCH CATEGORIES
//   |--------------------------------------------------------------------------
//   */
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-6">

//       {/* TITLE */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Categories
//       </h2>

//       {/* ALL */}
//       <button
//         onClick={() =>
//           setSelectedCategory(null)
//         }
//         className={`w-full text-left px-4 py-3 rounded-xl mb-3 transition duration-300 ${
//           selectedCategory === null
//             ? "bg-blue-600 text-white"
//             : "bg-gray-100 hover:bg-gray-200"
//         }`}
//       >
//         All Categories
//       </button>

//       {/* CATEGORY LIST */}
//       {categories.map((category) => (
//         <button
//           key={category.id}
//           onClick={() =>
//             setSelectedCategory(category.id)
//           }
//           className={`w-full text-left px-4 py-3 rounded-xl mb-3 transition duration-300 ${
//             selectedCategory === category.id
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           📂 {category.name}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default CategorySidebar;