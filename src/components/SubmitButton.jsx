"use client";

export default function SubmitButton() {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition"
      >
        등록
      </button>
    </div>
  );
}
