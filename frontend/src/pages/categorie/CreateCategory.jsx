import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createCategory } from "../../features/categories/categorySlice";

function CreateCategory() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createCategory({ name }));

    if (createCategory.fulfilled.match(result)) {
      navigate("/categories");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5">Create Category</h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full border p-3 rounded-xl"
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl mt-4">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
