// src/components/MenuList.jsx
import PropTypes from "prop-types";

const MenuList = ({ menus, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4">
      {menus.map((menu) => (
        <div key={menu._id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-bold">{menu.nama}</h3>
          <p>Harga: Rp{menu.harga}</p>
          <img
            src={menu.gambar}
            alt={menu.nama}
            className="w-32 h-32 object-cover my-2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(menu)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(menu._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

MenuList.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      harga: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      gambar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuList;
