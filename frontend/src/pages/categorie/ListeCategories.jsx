import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchCategories,
  deleteCategory,
} from "../../features/categories/categorySlice";

function ListeCategories() {
  const dispatch = useDispatch();

  const {
    categories,

    loading,

    currentPage,

    lastPage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Delete category ?")) {
      dispatch(deleteCategory(id));
    }
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      dispatch(fetchCategories(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchCategories(currentPage - 1));
    }
  };

  if (loading) {
    return <h2 className="text-center py-20">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>

        <Link to="/create-category">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
            Add Category
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold">{category.name}</h2>

            <p className="text-gray-500 mt-2">
              Articles :{category.articles_count}
            </p>

            <div className="flex gap-3 mt-5">
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

      {/* PAGINATION */}

      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        {[...Array(lastPage)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => dispatch(fetchCategories(page))}
              className={`w-10 h-10 rounded ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={nextPage}
          disabled={currentPage === lastPage}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListeCategories;
