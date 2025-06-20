import img from "../assets/img/home.png";
import bgImage from "../assets/img/bg_1.png"; 
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 220, 171, 0.8), rgba(171, 107, 46, 0.8)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0 text-white">
        <h1 className="font-semibold text-5xl text-center lg:text-start leading-tight">
          Awali harimu dengan minum di kedai hello 
        </h1>
        <p>
          Tingkatkan produktivitas Anda dan bangkitkan suasana hati Anda dengan segelas kopi di pagi hari
        </p>

        <div className="flex flex-row gap-6 ">
          <Button title="MENU" />
        </div>
      </div>

      <div className="relative">
        <img src={img} alt="img" />

        <div className="absolute bg-white px-8 py-2 top-5 right-0 rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <h2 className="font-semibold">14K</h2>
        </div>

        <div className="absolute bg-white px-8 py-2 bottom-0 -left-10 rounded-full">
          <h2 className="font-semibold">Cappuccino</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
