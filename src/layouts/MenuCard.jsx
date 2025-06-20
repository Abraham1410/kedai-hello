import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const MenuCard = ({ id, img, title, value }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedType, setSelectedType] = useState("Hot");

  const handleAddToCart = () => {
    // Konversi harga dari "Rp 18.000" ke 18000 (number)
    const price = Number(value.replace(/[^\d]/g, ""));
    addToCart({
      id: `${id}-${selectedType}`, // unique ID per Hot/Cold
      title,
      price,
      type: selectedType,
    });
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
        <div className="flex flex-row justify-between mt-3 items-center">
          <div className="flex gap-2">
            <button
              className={`px-3 text-sm border-2 rounded-lg transition-all ${
                selectedType === "Hot"
                  ? "bg-[#AB6B2E] text-white border-[#AB6B2E]"
                  : "bg-[#FFDCAB] text-[#AB6B2E] border-[#AB6B2E]"
              }`}
              onClick={() => setSelectedType("Hot")}
            >
              Hot
            </button>
            <button
              className={`px-3 text-sm border-2 rounded-lg transition-all ${
                selectedType === "Cold"
                  ? "bg-[#AB6B2E] text-white border-[#AB6B2E]"
                  : "bg-[#FFDCAB] text-[#AB6B2E] border-[#AB6B2E]"
              }`}
              onClick={() => setSelectedType("Cold")}
            >
              Cold
            </button>
          </div>
          <span
            className="flex items-center bg-[#FFDCAB] px-3 py-2 rounded-full cursor-pointer hover:bg-[#e5c18f]"
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
