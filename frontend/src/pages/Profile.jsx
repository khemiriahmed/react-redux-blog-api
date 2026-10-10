import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/auth/authSlice";
import api from "../services/axios";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const updateProfile = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await api.put("/profile", { name, email });

      await dispatch(fetchUser());

      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      await api.post("/profile/avatar", formData);

      await dispatch(fetchUser());

      setMessage("Avatar updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {user?.avatar && (
        <img
          src={`http://127.0.0.1:8000/storage/${user.avatar}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
      )}

      {user?.avatar && (
        <p className="text-xs text-gray-500 mb-4">
          Current avatar: {user.avatar}
        </p>
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

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {message && <p className="text-green-600 mb-3">{message}</p>}

      <button
        onClick={updateProfile}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        className="mt-4"
      />
    </div>
  );
}

export default Profile;