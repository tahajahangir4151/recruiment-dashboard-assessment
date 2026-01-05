import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const Sidebar = ({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) => {
  return (
    <>
      <aside className="hidden md:flex h-screen w-52 bg-[#142D52] text-white">
        <div className="flex flex-col p-6 w-full">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="CertiJob" width={150} height={150} />
            </div>

            <nav className="mt-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg py-3 text-sm font-bold"
              >
                <Image
                  src="/briefCase.svg"
                  alt="Briefcase Icon"
                  height={20}
                  width={20}
                />
                My Recruitment
              </Link>
            </nav>
          </div>

          <div className="mt-auto">
            <div className="border-b border-[#06BF97] mb-6"></div>
            <Image
              src="/sideBarImage.svg"
              alt="Sidebar Image"
              height={150}
              width={150}
            />
          </div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          <div className="absolute left-0 top-0 h-full w-72 bg-[#142D52] text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <Image src="/logo.svg" alt="CertiJob" width={120} height={120} />
              <button
                onClick={onClose}
                className="p-2 rounded hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg py-3 text-sm font-bold"
                onClick={onClose}
              >
                <Image
                  src="/briefCase.svg"
                  alt="Briefcase Icon"
                  height={20}
                  width={20}
                />
                My Recruitment
              </Link>

              <Link href={"/create"}>
                {" "}
                <button
                  onClick={() => {
                    onClose && onClose();
                  }}
                  className="mt-4 w-full py-3 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
                >
                  Create New Recruitment
                </button>
              </Link>
            </nav>

            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[#06BF97] bg-[#142D52]">
              <div className="mt-3 flex justify-center">
                <Image
                  src="/sideBarImage.svg"
                  alt="Sidebar Image"
                  height={110}
                  width={110}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
