// src/components/MenuForm.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MenuForm = ({ onSubmit, currentMenu }) => {
  const [form, setForm] = useState({ nama: "", harga: "", gambar: "" });

  useEffect(() => {
    if (currentMenu) {
      setForm(currentMenu);
    } else {
      setForm({ nama: "", harga: "", gambar: "" });
    }
  }, [currentMenu]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        name="nama"
        value={form.nama}
        onChange={handleChange}
        placeholder="Nama Menu"
        className="border p-2 w-full"
        required
      />
      <input
        name="harga"
        type="number"
        value={form.harga}
        onChange={handleChange}
        placeholder="Harga"
        className="border p-2 w-full"
        required
      />
      <input
        name="gambar"
        value={form.gambar}
        onChange={handleChange}
        placeholder="URL Gambar"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {currentMenu ? "Update" : "Tambah"}
      </button>
    </form>
  );
};

MenuForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentMenu: PropTypes.shape({
    _id: PropTypes.string,
    nama: PropTypes.string,
    harga: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gambar: PropTypes.string,
  }),
};

export default MenuForm;
