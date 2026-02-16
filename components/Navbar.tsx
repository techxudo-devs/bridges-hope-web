import React from "react";
import {
  Heart,
  ChevronDown,
  Phone,
  Search,
  ShoppingCart,
  Menu,
  ArrowRight,
} from "lucide-react";

const Navbar = ({ isSticky = false }: { isSticky?: boolean }) => {
  return (
    <header
      className={`${isSticky ? "bg-secondary py-3 shadow-lg" : "bg-secondary/30 py-5 border-b border-white/10"} text-white w-full px-4 md:px-8 transition-all duration-300`}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full scale-90 opacity-20 group-hover:scale-110 transition-transform"></div>
            <Heart className="text-white fill-white" size={32} />
            <Heart className="text-primary fill-primary absolute" size={16} />
          </div>
          <span className="text-3xl font-black tracking-tight font-nunito leading-none">
            Help<span className="text-primary">est</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-8">
          <div className="flex flex-col group cursor-pointer relative py-2">
            <div className="flex items-center gap-1 text-primary font-bold">
              Home
            </div>
            <div className="absolute -bottom-[20px] left-0 h-0.5 bg-primary w-full"></div>
          </div>
          <a
            href="#"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            About
          </a>
          <a
            href="#"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            Programs
          </a>
          <a
            href="#"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            Projects
          </a>
          <a
            href="#"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            News
          </a>
          <a
            href="#"
            className="font-bold text-[15px] hover:text-primary transition-colors py-2"
          >
            Contact us
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Call Section */}
          <div className="hidden md:flex items-center gap-3 border-r border-white/10 pr-6 mr-2 h-10">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer">
              <Phone size={18} className="text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                Call Anytime
              </span>
              <span className="text-[15px] font-extrabold tracking-wide font-nunito">
                +92 ( 8800 ) - 6780
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="hover:text-primary transition-all hover:scale-110">
              <Search size={24} strokeWidth={2.5} />
            </button>
            <div className="relative group cursor-pointer hover:scale-110 transition-transform">
              <ShoppingCart
                size={24}
                strokeWidth={2.5}
                className="group-hover:text-primary transition-colors"
              />
              <span className="absolute -top-3 -right-3 bg-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#092a24]">
                02
              </span>
            </div>
            <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center xl:hidden active:scale-95 transition-transform">
              <Menu size={20} />
            </button>
            <button className="w-11 h-11 bg-primary rounded-full hidden xl:flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 active:scale-95">
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Donate Button */}
          <button className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 hover:border-primary px-7 py-3 rounded-full transition-all group relative overflow-hidden">
            <span className="font-extrabold text-[15px] font-nunito relative z-10 transition-colors group-hover:text-white">
              Donate Now
            </span>
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center -mr-3 relative z-10 group-hover:scale-110 transition-transform shadow-lg">
              <ArrowRight size={18} strokeWidth={3} />
            </div>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
