import QRISImage from "../assets/img/qris-hello.jpg";

import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const QrisPage = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const receiptRef = useRef(); // untuk bagian struk

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleDownload = () => {
    html2canvas(receiptRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("struk-pembayaran.pdf");
    });
  };

  const handleSendWhatsApp = () => {
    // Validasi sederhana
    if (!formData.name) {
      alert("Mohon isi data pelanggan terlebih dahulu.");
      return;
    }

    const phoneNumber = "6285746135277"; // Ganti dengan nomor WhatsApp kedai kamu

    let message = `🧾 *Pesanan Baru - Hello Coffee*\n\n`;
    message += `👤 *Nama:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    if (formData.notes) {
      message += `📝 *Catatan:* ${formData.notes}\n`;
    }
    message += `\n🛒 *Detail Pesanan:*\n`;

    cartItems.forEach((item) => {
      message += `- ${item.title} (${item.type || "-"}) x${item.quantity}: Rp ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n💰 *Total: Rp ${getTotalPrice().toLocaleString()}*`;
    message += `\n\n🙏 Terima kasih atas pesanannya.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-14">
        
        {/* === QRIS Section === */}
        <div className="flex-1 text-center">
          <h2 className="text-xl font-semibold mb-4">Scan QRIS untuk Membayar</h2>
          <img
            src={QRISImage}
            alt="QRIS Hello Coffee"
            className="w-full max-w-sm mx-auto"
          />
          <p className="text-sm mt-4 text-gray-600">
            Silakan scan QR di atas menggunakan aplikasi e-wallet Anda.
          </p>
          <p className="text-sm font-medium mt-1">Atas nama: Hello Coffee</p>
        </div>

        {/* === Struk Section === */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Struk Pesanan</h2>
          
          {/* Ref ke struk */}
          <div ref={receiptRef} className="border border-gray-300 rounded-md p-4 bg-gray-50">
            
            {/* Data Pelanggan */}
            <div className="mb-4 text-sm text-gray-700 space-y-1">
              <p><strong>Nama:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              {formData.notes && <p><strong>Catatan:</strong> {formData.notes}</p>}
            </div>

            {/* Daftar Item */}
            <div className="divide-y divide-dashed divide-gray-300">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 text-sm">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500 text-xs">
                      Tipe: {item.type || "-"} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Harga */}
            <div className="mt-4 border-t pt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>Rp {getTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          {/* Tombol Unduh PDF */}
          <button
            onClick={handleDownload}
            className="mt-4 px-6 py-2 bg-green-300 text-black font-medium rounded-full hover:bg-green-500 transition duration-200"
          >
            Unduh Struk (PDF)
          </button>

          {/* Tombol Kirim WhatsApp */}
          <button
            onClick={handleSendWhatsApp}
            className="mt-4 px-6 py-2 bg-green-300 text-black font-medium rounded-full hover:bg-green-500 transition duration-200"
          >
            Kirim Pesanan ke WhatsApp
          </button>

        </div>
      </div>
    </div>
  );
};

export default QrisPage;
