import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { getApi } from "../../services/api";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getApi("api/feedbacks?active=true");
      setFeedbacks(result.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (feedbacks.length) {
    return (
      <div className="md:container py-8 md:px-60 mx-auto feedbacks-slider relative">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What customers say about buildbazm
        </h2>

        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={30}
          navigation
          modules={[Navigation]}
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div key={feedback.id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg px-6 py-12 text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(feedback.rating)].map((_, index) => (
                      <BiStar key={index} className="text-yellow-500 w-5 h-5" />
                    ))}
                    {[...Array(5 - feedback.rating)].map((_, index) => (
                      <BiStar key={index} className="text-gray-400 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-800 text-lg mb-4">
                    {'"'}
                    {feedback.feedback}
                    {'"'}
                  </p>
                  <p className="text-primary font-semibold">
                    - {feedback.user?.fullName}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

export default Feedbacks;
