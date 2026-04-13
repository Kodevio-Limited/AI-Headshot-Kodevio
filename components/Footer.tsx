import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-linear-to-r from-orange-600 to-orange-300"></div>
              <span className="text-xl font-bold">Aragon.ai</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">The Leading AI Headshot Generator for Professionals</p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-bold">IG</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-bold">X</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-bold">IN</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-bold">YT</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">AI Headshots</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Professional Headshots</Link></li>
              <li><Link href="/headshots-for-teams" className="hover:text-white transition-colors">Businesses</Link></li>
              <li><Link href="/headshots/linkedin-headshots" className="hover:text-white transition-colors">LinkedIn Headshots</Link></li>
              <li><Link href="/headshots/actor-headshots" className="hover:text-white transition-colors">Actor Headshots</Link></li>
              <li><Link href="/headshots/realtor-headshots" className="hover:text-white transition-colors">Realtor Headshots</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/support" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/security-policy" className="hover:text-white transition-colors">Security Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/affiliates" className="hover:text-white transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">&copy; 2026 Aragon AI, Inc. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
