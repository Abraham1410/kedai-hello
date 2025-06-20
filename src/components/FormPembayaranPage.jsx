import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPembayaranPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Nama dan Email wajib diisi!");
      return;
    }

    // Simpan data form
    localStorage.setItem("formData", JSON.stringify(formData));

    // Simpan ulang cart (jaga-jaga kalau belum disimpan)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/qris");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white max-w-xl mx-auto shadow rounded-lg p-6 mt-20">
        <h2 className="text-2xl font-semibold mb-4">Isi Data Pembayaran</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Catatan (opsional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              className="bg-[#AB6B2E] hover:bg-[#925c25] text-white px-6 py-2 rounded"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPembayaranPage;
