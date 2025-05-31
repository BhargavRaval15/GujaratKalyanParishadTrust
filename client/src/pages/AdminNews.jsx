import { useState } from "react";
import { postNews } from "../api/news";

export default function AdminNews() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return setMessage("Title and description are required.");
    }

    try {
      await postNews({ title, image, description });
      setMessage("News posted successfully ✅");
      setTitle("");
      setImage("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a News Item</h2>

      {message && (
        <div className="mb-4 p-2 text-white rounded bg-green-500">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="News title..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL (optional)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-28"
            placeholder="Enter news content..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Post News
        </button>
      </form>
    </div>
  );
}
