import PropTypes from "prop-types";
import { FaQuoteRight } from "react-icons/fa";
import { BsStarFill, BsStar } from "react-icons/bs";

const ReviewCard = ({ title, message, rating }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random`;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <BsStarFill key={i} className="text-yellow-400 text-xl" />
        ) : (
          <BsStar key={i} className="text-yellow-300 text-xl" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="flex-shrink-0 w-80 bg-white p-6 rounded-xl shadow-lg gap-4 transition hover:scale-105">
      <div className="flex items-center gap-4">
        <img className="w-12 h-12 rounded-full object-cover border" src={avatarUrl} alt={title} />
        <div>
          <h2 className="font-bold text-lg capitalize text-gray-800">{title}</h2>
          <div className="flex">{renderStars()}</div>
        </div>
        <FaQuoteRight className="ml-auto text-4xl text-orange-300" />
      </div>
      <p className="text-gray-700 italic">&quot;{message}&quot;</p>
    </div>
  );
};

ReviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ReviewCard;
