'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Helpest</h3>
            <p className="text-gray-400 mb-6">
              We are a non-profit charity organization dedicated to making a positive impact in communities worldwide.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span>📍</span> 88 Brooklyn Street, New York
              </p>
              <p className="flex items-center gap-2">
                <span>📧</span> info@helpest24.com
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> +92 (8800) - 6780
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/causes" className="hover:text-emerald-400 transition">
                  Our Causes
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-emerald-400 transition">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition">
                  Latest Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent News */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Recent News</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-emerald-400 transition block">
                  <p className="text-sm">How Your Donations Change Lives</p>
                  <span className="text-xs text-gray-500">03 Aug 2024</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition block">
                  <p className="text-sm">Volunteer Success Stories</p>
                  <span className="text-xs text-gray-500">28 Jul 2024</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-400 transition block">
                  <p className="text-sm">Building Hope in Communities</p>
                  <span className="text-xs text-gray-500">15 Jul 2024</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Link
                  key={num}
                  href="#"
                  className="aspect-square bg-gradient-to-br from-emerald-400 to-teal-400 rounded hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Helpest. All Rights Reserved. Recreated with Next.js
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                f
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                t
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                in
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition"
              >
                ig
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-emerald-700 transition shadow-lg"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
