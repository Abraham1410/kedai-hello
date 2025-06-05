import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const MenuCard = ({ id, img, title, value }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const price = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    addToCart({ id, title, price });
  };

  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <div>
        <img className="rounded-xl" src={img} alt={title} />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl">{title}</h3>
          <h3 className="font-semibold text-xl">{value}</h3>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex gap-2">
            <button className="px-3 text-sm border-2 border-[#AB6B2E] bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-lg">
              Hot
            </button>
            <button className="px-3 text-sm border-2 border-[#AB6B2E] bg-[#FFDCAB] hover:text-[#AB6B2E] transition-all rounded-lg">
              Cold
            </button>
          </div>
          <span
            className="flex items-center bg-[#FFDCAB] px-3 py-2 rounded-full cursor-pointer"
            onClick={handleAddToCart}
          >
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, 
};

export default MenuCard;
