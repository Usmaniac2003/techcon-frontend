import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AllServices from "../../data/allservices.json";
import CouponSlide from "./CouponSlide";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../services/api";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/StateContext";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  const {isMobile, activeCity} = useStateContext(); 

  const fetchCoupons = async () => {
    try {
      const coupons = await getApi("api/coupons/active?cityId=" + activeCity);
      setCoupons(coupons.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  if (coupons.length)
    return (
      <>
        <div
          className={`relative coupons-slider pt-8 px-1 ${
            coupons.length < 3 && "px-8"
          }`}
        >
          <Swiper
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            slidesPerView={isMobile ? 1 : (coupons.length < 3 ? coupons.length : 3)}
            loop={true}
            spaceBetween={30}
            pagination={true}
            modules={[Pagination, Autoplay]}
          >
            {coupons.map((coupon) => (
              <SwiperSlide key={coupon?._id}>
                <Link to={`/service/${coupon?.applicableServices[0]}?coupon=${coupon?.code}`}>
                    <CouponSlide AllServices={AllServices} data={coupon} />
                </Link>
              </SwiperSlide>
            ))}
    
          </Swiper>

          {coupons.length > 3 && (
            <div
              className="absolute right-0 top-0 bottom-0 w-[2%] z-50"
              style={{
                background:
                  "linear-gradient(90deg,hsla(0,0%,100%,.01),hsla(0,0%,100%,.898) 57%,#fff)",
              }}
            ></div>
          )}

          {coupons.length > 3 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-[2%] z-50"
              style={{
                background:
                  "linear-gradient(270deg,hsla(0,0%,100%,.01),hsla(0,0%,100%,.898) 57%,#fff)",
              }}
            ></div>
          )}
        </div>
      </>
    );
};

export default Coupons;
