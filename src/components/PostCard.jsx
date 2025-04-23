export default function PostCard({ title, date }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded border hover:shadow-sm transition cursor-pointer">
      <div>
        <p className="text-sm text-gray-400 mb-1">총명한 판다 · {date}</p>
        <h4 className="text-gray-800 font-medium">{title}</h4>
      </div>
      <div className="text-center">
        <img
          src="/default.jpg"
          alt="썸네일"
          className="w-12 h-12 object-cover rounded"
        />
        <p className="text-xs text-gray-500 mt-1">❤️ 9999+</p>
      </div>
    </div>
  );
}
