import PropTypes from "prop-types";
import { createContext, useState } from "react";

// Membuat context
export const CartContext = createContext();

// Provider untuk membungkus seluruh aplikasi
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Menambahkan item ke keranjang
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Jika item sudah ada, tambahkan quantity
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Jika item belum ada, tambahkan ke cart dengan quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Mendapatkan total harga seluruh item
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Mendapatkan total jumlah item (untuk ditampilkan di ikon keranjang)
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalPrice, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Validasi props children
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
