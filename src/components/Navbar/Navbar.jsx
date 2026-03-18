import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdSearch, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { useCart } from "../../context/CartContext";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Contact",
    link: "/contact",
  },
  {
    id: 4,
    name: "Orders",
    link: "/orders",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Audio Devices",
    link: "/shop/audio",
  },
  {
    id: 2,
    name: "Gaming Gear",
    link: "/shop/gaming",
  },
  {
    id: 3,
    name: "Wearables",
    link: "/shop/wearables",
  },
  {
    id: 4,
    name: "Mobile Accessories",
    link: "/shop/mobile",
  },
  {
    id: 5,
    name: "Camera & Photo",
    link: "/shop/camera",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-gradient-to-r from-primary to-secondary py-3">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl sm:text-3xl flex items-center gap-2 text-white">
            <img src={Logo} alt="Logo" className="w-10 h-10 drop-shadow-lg" />
            <span className="drop-shadow-lg">Accessoir BHS</span>
          </Link>

          {/* Desktop Menu Items */}
          <div className="hidden lg:flex items-center gap-6">
            {Menu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="text-white hover:text-white/80 font-medium transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <div className="group relative">
              <button className="text-white hover:text-white/80 font-medium flex items-center gap-1">
                Shop
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {DropdownLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.link}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative group hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-[180px] lg:w-[250px] group-hover:w-[280px] transition-all duration-300 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20"
              />
              <IoMdSearch className="text-white/70 group-hover:text-white absolute top-1/2 -translate-y-1/2 right-3 text-xl" />
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 relative border-2 border-white/30"
            >
              <FaCartShopping className="text-xl" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <DarkMode />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white text-2xl p-2"
            >
              {mobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container py-4">
            <div className="flex flex-col gap-3">
              {Menu.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-semibold">
                Categories
              </div>
              {DropdownLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
