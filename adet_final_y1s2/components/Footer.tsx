export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-3">🎬 Moonlight Motion</h3>
            <p className="text-gray-600 text-sm">Your favorite drive-in movie experience, reimagined.</p>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-3">Quick Links</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li><a href="/" className="hover:text-gray-900">Home</a></li>
              <li><a href="/movies" className="hover:text-gray-900">Movies</a></li>
              <li><a href="/about" className="hover:text-gray-900">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-3">Contact</h4>
            <p className="text-gray-600 text-sm">hello@moonlightmotion.com</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Moonlight Motion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}