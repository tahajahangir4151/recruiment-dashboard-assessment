import React from "react";
import { Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-600">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">Terms of Services</li>
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">Terms of Sales</li>
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">Privacy policy &amp; Cookies</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-600">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">For subject-matter experts</li>
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">Help center</li>
              <li className="text-slate-500 hover:text-slate-700 cursor-pointer">Information for candidates</li>
            </ul>
          </div>

          <div className="space-y-4 md:ml-auto">
            <div className="flex items-center gap-3">
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500 hover:bg-emerald-50" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500 hover:bg-emerald-50" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500 hover:bg-emerald-50" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500 hover:bg-emerald-50" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-slate-500">Subscribe our Newsletters to keep updated yourself with Current Revolution in Fitness Sector.</p>

            <form className="mt-3 flex items-center gap-2 max-w-md">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input id="footer-email" type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm" />
              <button type="submit" className="p-2 rounded bg-emerald-500 text-white hover:bg-emerald-600" aria-label="Subscribe">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-500">© CertiJob 2021. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
