import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {
  fetchCategoryById,
  updateCategory,
} from "../../features/categories/categorySlice";

function EditCategory() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleCategory, loading } = useSelector((state) => state.categories);

  /*
  |--------------------------------------------------------------------------
  | LOAD CATEGORY
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  if (loading && !singleCategory) {
    return <h2 className="text-center py-20">Loading...</h2>;
  }

  if (!singleCategory) {
    return <h2 className="text-center py-20">Category not found</h2>;
  }

  return (
    <EditCategoryForm key={singleCategory.id} category={singleCategory} />
  );
}

function EditCategoryForm({ category }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState(category.name || "");

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateCategory({
        id,

        categoryData: {
          name,
        },
      }),
    );

    if (updateCategory.fulfilled.match(result)) {
      navigate("/categories");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Category</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="w-full border rounded-xl px-4 py-3"
            />

            <div className="flex gap-4">
              <button
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => navigate("/categories")}
                className="bg-gray-300 px-6 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
