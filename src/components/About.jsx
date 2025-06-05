import img from "../assets/img/about.jpg";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">Tentang Kami</h1>

      <div className=" flex flex-col lg:flex-row items-center gap-5">
        <div className=" w-full lg:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>
        <div className=" w-full lg:w-2/4 p-4 space-y-3">
          <h2 className=" font-semibold text-3xl">
            Apa itu Kedai Hello?
          </h2>
          <p>
            Kedai Hello adalah sebuah kedai yang terletak di halaman Rumah Sakit Mata Masyarakat Jawa Timur, 
            Kedai ini menawarkan berbagai pilihan makanan dan minuman khas yang dapat dinikmati oleh pasien, pengunjung, 
            maupun staf rumah sakit.
          </p>
          <p>
            Dengan suasana yang nyaman dan menu yang beragam, Kedai Hello menjadi tempat yang ideal 
            untuk bersantai dan menikmati hidangan lezat di lingkungan rumah sakit.
          </p>

          <Button title="Lebih Lanjut" />
        </div>
      </div>
    </div>
  );
};

export default About;
