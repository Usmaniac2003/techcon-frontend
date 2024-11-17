import { Link } from "react-router-dom";

const CTAButton = () => {
  return (
    <Link to={"/events"}>
        <div className="flex items-center justify-center mt-20">
          <div className="relative group">
            {/* Glowing button */}
            <button
              className="relative z-10 w-32 h-32 bg-primary p-3 text-white font-bold text-lg rounded-full shadow-lg
                         hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              Book Now
            </button>
            {/* Circle rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full bg-pink-600 opacity-20 group-hover:animate-ping"></div>
              <div className="absolute w-52 h-52 rounded-full bg-pink-600 opacity-10 group-hover:animate-ping"></div>
              <div className="absolute w-64 h-64 rounded-full bg-pink-600 opacity-5 group-hover:animate-ping"></div>
            </div>
          </div>
        </div>
    </Link>
  );
};

export default CTAButton;
