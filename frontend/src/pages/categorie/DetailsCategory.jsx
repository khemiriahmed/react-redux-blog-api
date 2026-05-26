import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchSingleCategory } from "../features/categories/categorySlice";

function CategoryDetails() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const { singleCategory } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchSingleCategory(slug));
  }, [dispatch, slug]);

  if (!singleCategory) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-6">
        {singleCategory.name}
      </h1>

      <div className="grid gap-5">
        {singleCategory.articles?.map(
          (article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-2xl font-bold">
                {article.title}
              </h2>

              <p className="text-gray-600">
                {article.excerpt}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CategoryDetails;