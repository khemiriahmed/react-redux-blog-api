import { useEffect, useState } from "react";
import api from "../services/axios";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          Users: {data?.users}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Articles: {data?.articles}
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Comments: {data?.comments}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
