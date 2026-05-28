import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  deleteCategory,
} from "../../features/categories/categorySlice";

function ListeCategories() {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories()); 125
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete category ?")) {
      dispatch(deleteCategory(id));
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <Link to="/create-category">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
            Add Category
          </button>
        </Link>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="bg-white shadow rounded-xl p-5 mb-4">
          <h2 className="text-xl font-bold">{category.name}</h2>

          <p>Articles : {category.articles_count}</p>

          <div className="mt-4 flex gap-3">
            <Link to={`/categories/${category.slug}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                View
              </button>
            </Link>

            <Link to={`/edit-category/${category.id}`}>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                Edit
              </button>
            </Link>

            <button
              onClick={() => handleDelete(category.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListeCategories;
