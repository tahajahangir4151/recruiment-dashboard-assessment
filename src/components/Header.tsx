"use client";

import { useGetCountriesQuery } from "@/store/baseQuery";
import { setCountry } from "@/store/slices/countrySlice";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Bell, ChevronDown } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Header = ({ onOpenSidebar, title }: { onOpenSidebar?: () => void; title?: string }) => {
  const dispatch = useDispatch();
  const { data: countries, isLoading } = useGetCountriesQuery();
  const { selectedCountryCode } = useSelector(
    (state: RootState) => state.country
  );

  const selectedCountry = countries?.find(
    (c) => c.cca2 === selectedCountryCode
  );

  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-8 border-b bg-white">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md mr-1"
          onClick={() => onOpenSidebar && onOpenSidebar()}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h1 className="text-lg md:text-xl font-bold text-slate-800">{title || "My Recruitments"}</h1>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 focus:outline-none">
              {isLoading ? (
                <div className="w-5 h-3 bg-slate-200 animate-pulse rounded" />
              ) : (
                <img
                  src={
                    selectedCountry?.flags.svg || "https://flagcdn.com/us.svg"
                  }
                  alt="Flag"
                  className="w-5 h-auto rounded-sm"
                />
              )}
              <span className="text-sm font-medium">{selectedCountryCode}</span>
              <ChevronDown className="w-4 h-4 opacity-60" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 mt-2 rounded-md border bg-white shadow-lg max-h-70 overflow-y-auto"
          >
            {countries?.map((country) => (
              <DropdownMenuItem
                key={country.cca2}
                onClick={() =>
                  dispatch(
                    setCountry({
                      code: country.cca2,
                      label: country.cca2.slice(0, 2).toUpperCase(),
                    })
                  )
                }
                className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
              >
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-4 h-auto"
                />
                <span>{country.name.common}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="relative p-2 rounded-full cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-100">
          <Bell className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer hover:bg-slate-100">
            <Avatar className="w-9 h-9 rounded-full">
              <AvatarImage src="/profilePhoto.svg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-700">John Doe</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* mobile avatar stack */}
        <div className="md:hidden">
          <Avatar className="w-9 h-9 rounded-full">
            <AvatarImage src="/profilePhoto.svg" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}; 

export default Header;
