// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import MenuForm from "./MenuForm";
import MenuList from "./MenuList";

const AdminDashboard = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenus = async () => {
    const res = await axios.get("http://localhost:5000/api/menus");
    setMenus(res.data);
  };

  const addOrUpdateMenu = async (menu) => {
    if (menu._id) {
      await axios.put(`http://localhost:5000/api/menus/${menu._id}`, menu);
    } else {
      await axios.post("http://localhost:5000/api/menus", menu);
    }
    fetchMenus();
    setSelectedMenu(null);
  };

  const deleteMenu = async (id) => {
    await axios.delete(`http://localhost:5000/api/menus/${id}`);
    fetchMenus();
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>
      <MenuForm onSubmit={addOrUpdateMenu} currentMenu={selectedMenu} />
      <MenuList menus={menus} onEdit={setSelectedMenu} onDelete={deleteMenu} />
    </div>
  );
};

export default AdminDashboard;
