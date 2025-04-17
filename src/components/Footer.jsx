export default function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] text-white py-6 px-6 text-sm mt-12">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <p className="text-gray-400">©codeit - 2024</p>
        <div className="flex gap-6 text-gray-300">
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
        </div>
        <div className="flex gap-4">
          <img src="/icons/facebook.svg" alt="facebook" className="w-5 h-5" />
          <img src="/icons/twitter.svg" alt="twitter" className="w-5 h-5" />
          <img src="/icons/youtube.svg" alt="youtube" className="w-5 h-5" />
          <img src="/icons/instagram.svg" alt="instagram" className="w-5 h-5" />
        </div>
      </div>
    </footer>
  );
}
