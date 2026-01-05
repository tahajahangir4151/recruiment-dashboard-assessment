import { Twitter, Facebook, Instagram, Linkedin, Send } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-700">
      <div className="max-w-8xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="space-y-2">
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Services
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Pricing
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Terms of Services
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Terms of Sales
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Privacy Policy and cookies
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-600">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                For subject-matter experts
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Help center
              </li>
              <li className="text-[#827F7F] hover:text-slate-700 cursor-pointer">
                Information for candidates
              </li>
            </ul>
          </div>

          <div className="space-y-4 md:ml-auto">
            <div className="flex items-center gap-3">
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#06BF97] hover:bg-emerald-50">
                <Twitter className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#06BF97] hover:bg-emerald-50">
                <Facebook className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#06BF97] hover:bg-emerald-50">
                <Instagram className="w-4 h-4" />
              </a>
              <a className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#06BF97] hover:bg-emerald-50">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-[#827F7F]">
              Subscribe our Newsletters to keep updated yourself with Current
              Revolution in Fitness Sector.
            </p>

            <form className="mt-3 max-w-md">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 pr-10 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 p-2 rounded-lg bg-[#06BF97] text-white hover:bg-emerald-600"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t bg-white/50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-[#827F7F]">
          © CertiJob 2021. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
