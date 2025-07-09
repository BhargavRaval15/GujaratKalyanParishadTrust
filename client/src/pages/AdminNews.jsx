import { useState, useEffect } from "react";
import { postNews, getAdminNews, deleteNews } from "../api/news";

export default function AdminNews() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getAdminNews();
      setNewsList(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !source || images.length === 0) {
      setMessage("Title, newspaper name, and at least one photo are required.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", `Newspaper: ${source}`);
      formData.append("source", source);
      formData.append("category", "Newspaper");
      
      images.forEach((image) => {
        formData.append("images", image);
      });

      await postNews(formData);
      setMessage("Newspaper uploaded successfully! ✅");
      setTitle("");
      setImages([]);
      setSource("");
      document.getElementById("images").value = "";
      fetchNews();
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload newspaper ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this newspaper?")) {
      try {
        await deleteNews(id);
        setMessage("Newspaper deleted successfully! ✅");
        fetchNews();
      } catch (err) {
        console.error(err);
        setMessage("Failed to delete newspaper ❌");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📰 Upload Newspaper
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">News Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Today's Headlines, Sports News..."
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Newspaper Name *</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Gujarat Samachar, Divya Bhaskar, Times of India..."
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Newspaper Photos *</label>
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                📸 Upload multiple photos of newspaper pages. Users will be able to read them.
              </p>
              {images.length > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  ✅ {images.length} photo(s) selected
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  📤 Upload Newspaper
                </>
              )}
            </button>
          </form>
        </div>

        {/* News List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📋 Uploaded Newspapers
          </h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {newsList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📰</div>
                <p>No newspapers uploaded yet.</p>
              </div>
            ) : (
              newsList.map((news) => (
                <div key={news._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{news.title}</h3>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span>📰 {news.source}</span>
                          <span>📅 {new Date(news.date).toLocaleDateString()}</span>
                        </div>
                        {news.images && (
                          <div className="flex items-center gap-2">
                            <span>📸 {news.images.length} photo(s)</span>
                          </div>
                        )}
                      </div>
                      
                      {news.images && news.images.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto">
                          {news.images.slice(0, 3).map((image, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000${image}`}
                              alt={`Preview ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ))}
                          {news.images.length > 3 && (
                            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600">
                              +{news.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-4 flex items-center gap-1"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}