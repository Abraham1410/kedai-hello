import { useState, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* Kiri - Logo */}
        <div className="flex flex-row items-center cursor-pointer gap-2">
          <SiCoffeescript size={25} />
          <h1 className="text-xl font-semibold">Hello Coffee</h1>
        </div>

        {/* Tengah - Navigasi */}
        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
          {["home", "menu", "about", "products", "review"].map((item) => (
            <ScrollLink
              key={item}
              to={item}
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink>
          ))}
        </nav>

        {/* Kanan - Keranjang & Menu Toggle */}
        <div className="flex items-center gap-4">
          <RouterLink to="/checkout" className="relative">
            <FaShoppingCart size={22} className="text-white hover:text-brightColor cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </RouterLink>
          <div className="md:hidden">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
        {["home", "menu", "about", "products", "review"].map((item) => (
          <ScrollLink
            key={item}
            to={item}
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </ScrollLink>
        ))}
        <RouterLink to="/checkout" className="hover:text-brightColor transition-all" onClick={closeMenu}>
          Checkout
        </RouterLink>
      </div>
    </div>
  );
};

export default Navbar;
