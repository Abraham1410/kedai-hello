import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  AiOutlineMinusCircle,
  AiOutlineCloseCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const CartDropdown = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useContext(CartContext);

  return (
    <div className="bg-white text-black w-80 shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">Keranjang</h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">Keranjang kosong</p>
      ) : (
        <>
          <ul className="text-sm space-y-3 mb-3">
            {cartItems.map((item) => (
              <li
                key={`${item.id}-${item.type}`}
                className="flex justify-between items-center border-b pb-1"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    Qty: {item.quantity} | Rp {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.type)}
                    title="Kurangi"
                  >
                    <AiOutlineMinusCircle className="text-red-500" size={20} />
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    title="Tambah"
                  >
                    <AiOutlinePlusCircle className="text-green-600" size={20} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    title="Hapus"
                  >
                    <AiOutlineCloseCircle className="text-gray-600" size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-semibold border-t pt-2">
            Total: Rp {getTotalPrice().toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
