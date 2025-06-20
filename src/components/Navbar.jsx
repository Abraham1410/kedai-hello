import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SiCoffeescript } from "react-icons/si";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import CartDropdown from "../components/CartDropdown";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMenuToggle = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setShowCart(!showCart);
  };

  return (
    <div className="fixed w-full z-50">
      <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* Logo */}
        <div className="flex flex-row items-center cursor-pointer gap-2">
          <SiCoffeescript size={25} />
          <h1 className="text-xl font-semibold">Hello Coffee</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
          {["home", "menu", "about", "review"].map((item) => (
            <span
              key={item}
              onClick={() => handleScrollTo(item)}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </span>
          ))}
        </nav>

        {/* Keranjang & Toggle Menu */}
        <div className="flex items-center gap-4 relative">
          <a href="#" onClick={toggleCart} className="relative">
            <FaShoppingCart size={22} className="text-white hover:text-brightColor cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>

          {/* Dropdown Keranjang */}
          {showCart && (
            <div className="absolute right-0 top-10 z-50">
              <CartDropdown />
              <button
                onClick={() => {
                  setShowCart(false);
                  navigate("/checkout");
                }}
                className="block text-center mt-2 text-sm text-white bg-brightColor hover:bg-orange-700 px-3 py-1 rounded-md"
              >
                Lihat Checkout
              </button>
            </div>
          )}

          {/* Toggle Mobile */}
          <div className="md:hidden">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleMenuToggle} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleMenuToggle} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        {["home", "menu", "about", "products", "review"].map((item) => (
          <span
            key={item}
            onClick={() => {
              handleScrollTo(item);
              closeMenu();
            }}
            className="hover:text-brightColor transition-all cursor-pointer"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </span>
        ))}
        <span
          onClick={() => {
            navigate("/checkout");
            closeMenu();
          }}
          className="hover:text-brightColor transition-all cursor-pointer"
        >
          Checkout
        </span>
      </div>
    </div>
  );
};

export default Navbar;
