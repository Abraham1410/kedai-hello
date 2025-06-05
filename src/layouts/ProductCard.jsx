import PropTypes from "prop-types";
import Button from "../layouts/Button";
import { BsStarHalf, BsStarFill } from "react-icons/bs";

const ProductCard = ({ img, title }) => {
  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <img className="rounded-lg" src={img} alt={title} />
      <div className="flex flex-col items-center mt-5 gap-3">
        <h2 className="font-semibold text-xl">{title}</h2>
        <div className="flex">
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarHalf className="text-brightColor" />
        </div>
        <h3 className="font-semibold text-lg">Rp. 140.000</h3>
        <Button title="Add To Cart" />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductCard;
