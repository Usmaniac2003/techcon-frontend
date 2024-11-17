import Event1 from "../../assets/videos/event1.mp4";
import CTAButton from "./CTAButton";

const Banner = () => {
  return (
    <div
      style={{ zIndex: 1 }}
      className="flex justify-center items-center h-full"
    >
      <div
        style={{ zIndex: 5 }}
        className="text-white h-full justify-center flex items-center flex-col"
      >
        <h1 className="text-3xl text-center">Your Gateway to</h1>

        <div className="flex items-center justify-center">
          <h1
            className="text-6xl font-bold text-white relative 
                   neon-effect"
          >
            Events, Travel, and Entertainment
          </h1>
        </div>

        <CTAButton />
      </div>
      <div
        style={{ zIndex: 2 }}
        className="absolute w-full h-full top-0 left-0 bg-[#cc24594d]"
      ></div>
      <video
        style={{ zIndex: 0 }}
        className="absolute object-cover top-0 left-0 w-full h-full"
        muted
        autoPlay
        loop
      >
        <source src={Event1} type="video/mp4" />
        <source src="video.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default Banner;
