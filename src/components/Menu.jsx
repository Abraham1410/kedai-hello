import { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "../layouts/MenuCard";

const Menu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menus");
        setMenus(res.data);
      } catch (err) {
        console.error("Gagal memuat menu:", err);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor">
      <h1 className="font-semibold text-center text-4xl mt-24 mb-8">
        Menu Kami
      </h1>

      <div className="flex flex-wrap pb-8 gap-8 justify-center">
        {menus.map((menu) => (
          <MenuCard
            key={menu._id}
            id={menu._id}
            img={menu.gambar}
            title={menu.nama}
            value={`Rp ${menu.harga.toLocaleString("id-ID")}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
