export default function BestCard({ title, image, nickname, date }) {
  return (
    <div className="w-full p-4 rounded-xl border bg-white cursor-pointer hover:shadow transition">
      <div className="text-sm text-blue-500 font-semibold mb-2">🔔 Best</div>
      <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2">{title}</h3>
      <div className="flex justify-between items-center">
        <img
          src={image || "/default.jpg"}
          alt="썸네일"
          className="w-14 h-14 object-cover rounded"
        />
      </div>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
        <p>{nickname} · ❤️ 9999+</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
