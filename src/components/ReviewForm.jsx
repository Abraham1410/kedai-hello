import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ReviewForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 5,  
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRatingChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rating: parseInt(e.target.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", formData);
      onSubmitSuccess();
      setFormData({ name: "", comment: "", rating: 5 });
    } catch (err) {
      console.error("Gagal kirim review:", err);
    }
  };

  return (
    <form
      className="bg-white shadow-lg p-8 rounded-xl mb-10 w-full lg:w-1/2 mx-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-6 text-center text-black">Tinggalkan Review Anda</h3>
      
      <input
        className="block border border-gray-300 mb-4 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        type="text"
        name="name"
        placeholder="Nama Anda"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <textarea
        className="block border border-gray-300 mb-4 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        name="comment"
        rows="4"
        placeholder="Komentar"
        value={formData.comment}
        onChange={handleChange}
        required
      />

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Rating:</label>
        <select
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          required
        >
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>{val} Bintang</option>
          ))}
        </select>
      </div>

      <button
        className="bg-gradient-to-r from-orange-400 to-brightColor text-white font-semibold px-6 py-3 rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.2)] w-full transition hover:brightness-110"
        type="submit"
      >
        Kirim Review
      </button>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default ReviewForm;
