import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useStateContext } from "../../contexts/StateContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServiceCategorySlider = ({ category, serviceCardWidth }) => {
  const sliderRef = useRef();
  const { isMobile, isRTL, activeCity } = useStateContext();
  const [leftSliderBtn, setLeftSliderBtn] = useState(false);
  const [rightSliderBtn, setRightSliderBtn] = useState(true);
  const { t } = useTranslation();

  const handleScroll = (e) => {
    setLeftSliderBtn(e.target.scrollLeft >= 8);
    setRightSliderBtn(
      e.target.scrollLeft < e.target.scrollWidth - e.target.clientWidth
    );
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += serviceCardWidth * 3 + 35;
  };

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= serviceCardWidth * 3 + 35;
  };
  return (
    <div key={category.id} className="py-4">
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-xl font-semibold">{category.title}</h2>
        <div className="flex items-center mr-5">
          <Link
            to={`/category/${category.slug}`}
            className={`font-bold text-primary ${isRTL && 'ml-5'}`}
          >
            {t("See all")}
          </Link>
          {!isMobile && (
            <div className="flex items-center ml-5">
              <div
                onClick={scrollLeft}
                className={`w-[35px] ${isRTL && 'order-2'} cursor-pointer ${
                  !leftSliderBtn && !isRTL && "text-gray-400 cursor-not-allowed"
                }  h-[35px] mr-2 border rounded-full p-2 flex justify-center items-center`}
              >
                <FaChevronLeft />
              </div>
              <div
                onClick={scrollRight}
                className={`w-[35px] h-[35px]  ${
                  !rightSliderBtn && isRTL && "text-gray-400 cursor-not-allowed"
                } cursor-pointer border rounded-full p-2 flex justify-center items-center`}
              >
                <FaChevronRight />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="md:mt-4 mt-2 w-full">
        <div
          onScroll={handleScroll}
          ref={sliderRef}
          className="flex items-start scroll-smooth md:gap-x-4 gap-x-3 overflow-x-scroll"
          id="no-scroll-bar"
        >
          {category.services?.map((service) => {
            return (
              <Link
                className="block"
                key={service.id}
                to={`/service/${service?.slug}`}
              >
                <div
                  className={`home-service-card rounded-lg  text-card-foreground`}
                  style={{
                    width: serviceCardWidth,
                  }}
                >
                  <img
                    width={"100%"}
                    height={250}
                    // alt={service?.title}
                    src={service?.image}
                    className="rounded shadow"
                    style={{
                      aspectRatio: "300 / 200",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="md:whitespace-nowrap mt-3 md:text-lg font-semibold leading-none tracking-tight">
                    {service?.title}
                  </h5>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategorySlider;
