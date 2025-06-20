import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../layouts/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      const sortedReviews = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews.slice(0, 3)); 
    } catch (err) {
      console.error("Gagal ambil review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // inisialisasi keen-slider
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
  });

  return (
    <div className="min-h-screen bg-backgroundColor px-5 lg:px-32 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Review Pelanggan</h1>

      {/* Form */}
      <ReviewForm onSubmitSuccess={fetchReviews} />

      {/* Review Cards */}
      <div ref={sliderRef} className="keen-slider mt-10">
        {reviews.map((item, index) => (
          <div key={index} className="keen-slider__slide flex justify-center">
            <ReviewCard
              title={item.name}
              message={item.comment}
              rating={item.rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
