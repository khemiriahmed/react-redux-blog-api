import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/axios";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState(null);

  const updateProfile = async () => {
    await api.put("/profile", { name, email });
    alert("Profile updated");
  };

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.post("/profile/avatar", formData);

    alert("Avatar updated");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {user?.avatar && (
        <img
          src={`http://127.0.0.1:8000/storage/${user.avatar}`}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <input
        className="border p-2 w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={updateProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <input type="file" onChange={uploadAvatar} className="mt-4" />
    </div>
  );
}

export default Profile;
