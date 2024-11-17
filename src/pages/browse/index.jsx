import { useEffect, useRef, useState } from "react";
import ServiceCategorySlider from "../../components/browse/ServiceCategorySlider";
import { useStateContext } from "../../contexts/StateContext";
import { useTranslation } from "react-i18next";
import { getApi } from "../../services/api";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"; // Import Skeleton components
import AllServicesComp from "../../components/browse/AllServicesComp";
import { useAuthContext } from "../../contexts/AuthContext";

function getWidth(element) {
  if (element) {
    let elementWidth = 0;
    var computedStyle = window.getComputedStyle(element);

    elementWidth = element.clientWidth;
    elementWidth -=
      parseFloat(computedStyle.paddingLeft) +
      parseFloat(computedStyle.paddingRight);

    return elementWidth;
  }
}

export default function Browse() {
  const [showMore, setShowMore] = useState(false);
  const { isMobile, activeCity } = useStateContext();
  const [serviceCardWidth, setServiceCardWidth] = useState(0);
  const servicesWrapperRef = useRef(null);
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const { t } = useTranslation();
  const {COUNTRY} = useAuthContext();
  

  useEffect(() => {
    if(COUNTRY !== null) {

    getApi("api/service/browse-api?city=" + activeCity + "&country=" + COUNTRY)
      .then((response) => {
        console.log("DATA", response);
        setServicesData(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false); // Ensure loading is set to false even on error
      });
    }
  }, [COUNTRY]);

  useEffect(() => {
    setServiceCardWidth(
      getWidth(servicesWrapperRef.current) * (isMobile ? 0.4 : 0.25)
    );
  }, [isMobile]);

  return (
    <div className="bg-white">
      <div className={!showMore && `max-h-[125vh] overflow-hidden relative`}>
        <div
          ref={servicesWrapperRef}
          className="md:container md:px-60 md:mx-auto mt-1 px-3"
        >
          {!showMore && servicesData?.length > 0 && (
            <div
              onClick={() => setShowMore(true)}
              className="absolute z-[99] md:container cursor-pointer md:w-[70%] rounded-sm md:mx-auto md:px-60 text-center bottom-0 py-2 left-0 right-0 bg-primary font-bold text-lg text-white"
            >
              {t("show more")}
            </div>
          )}

          {isLoading ? (
            // Display skeletons while loading
            Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} padding="6" boxShadow="lg" bg="white" mb={5}>
                <Skeleton height="200px" width="100%" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))
          ) : // Display the actual content when loading is complete

          servicesData?.length > 0 ? (
            activeCity !== null ? servicesData?.map((category) => (
              <ServiceCategorySlider
                serviceCardWidth={serviceCardWidth}
                key={category?.id}
                category={category}
              />
            )) : <AllServicesComp serviceCardWidth={serviceCardWidth} data={servicesData}/>
          ) : (
            <p className="text-center pb-4">No services to show :(</p>
            
          )}
        </div>
      </div>
    </div>
  );
}
