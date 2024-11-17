import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useStateContext } from "../../../contexts/StateContext";

const CustomDateTimeSlider = ({ data }) => {
  const slider = useRef();
  const {isMobile} = useStateContext(); 
  const [leftDateSliderBtn, setLeftDateSliderBtn] = useState(false);
  const [rightDateSliderBtn, setRightDateSliderBtn] = useState(true);

  const handleScroll = (e) => {
    setLeftDateSliderBtn(e.target.scrollLeft >= 8);
    setRightDateSliderBtn(
      e.target.scrollLeft < e.target.scrollWidth - e.target.clientWidth
    );
  };

  const scrollRight = () => {
    slider.current.scrollLeft += 200;
  };

  const scrollLeft = () => {
    slider.current.scrollLeft -= 200;
  };
  return (
    <div className="relative">
      <div
        onScroll={handleScroll}
        ref={slider}
        className="flex select-none items-center scroll-smooth mt-4 overflow-x-scroll"
        id="no-scroll-bar"
      >
        {data}
        {rightDateSliderBtn && !isMobile && (
          <div
            className="absolute h-full bottom-0 w-[10%] top-0 flex justify-end items-center -right-1"
            style={{
              background:
                "linear-gradient(90deg,hsla(0,0%,100%,.01),hsla(0,0%,100%,.898) 57%,#fff)",
            }}
          >
            <div>
              <div
                onClick={scrollRight}
                className="hover:bg-gray-300 cursor-pointer rounded-full p-1"
              >
                <FaChevronRight />
              </div>
            </div>
          </div>
        )}

        {leftDateSliderBtn && !isMobile && (
          <div
            className="absolute h-full bottom-0 w-[10%] top-0 flex justify-start items-center -left-1"
            style={{
              background:
                "linear-gradient(270deg,hsla(0,0%,100%,.01),hsla(0,0%,100%,.898) 57%,#fff)",
            }}
          >
            <div>
              <div
                onClick={scrollLeft}
                className="hover:bg-gray-300 cursor-pointer rounded-full p-1"
              >
                <FaChevronLeft />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDateTimeSlider;
