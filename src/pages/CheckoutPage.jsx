import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
  AiOutlineMinusCircle,
  AiOutlineCloseCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const CheckoutPage = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Halaman Pembayaran</h1>
        <p className="text-lg text-gray-600">Keranjang Anda kosong.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Halaman Pembayaran</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Produk</th>
              <th className="py-2 text-center">Tipe</th>
              <th className="py-2 text-center">Jumlah</th>
              <th className="py-2 text-center">Harga</th>
              <th className="py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={`${item.id}-${item.type}`} className="border-t">
                <td className="py-4 font-medium">{item.title}</td>
                <td className="py-4 text-center">{item.type || "-"}</td>
                <td className="py-4 text-center">{item.quantity}</td>
                <td className="py-4 text-center">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </td>
                <td className="py-4 text-center flex justify-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.type)}
                    title="Kurangi"
                  >
                    <AiOutlineMinusCircle size={20} className="text-red-500" />
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    title="Tambah"
                  >
                    <AiOutlinePlusCircle size={20} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    title="Hapus"
                  >
                    <AiOutlineCloseCircle size={20} className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-semibold">
            Total: Rp {getTotalPrice().toLocaleString()}
          </p>
          <button
            className="bg-[#AB6B2E] hover:bg-[#925c25] text-white px-6 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/form-pembayaran")}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
