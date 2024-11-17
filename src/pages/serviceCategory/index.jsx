import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getApi } from "../../services/api";
import { IoArrowBackOutline } from "react-icons/io5";
import { IconButton, Skeleton, SkeletonText, Box } from "@chakra-ui/react";
import { useStateContext } from "../../contexts/StateContext";

const ServiceCategory = () => {
  const [servicesData, setServicesData] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile, activeCity } = useStateContext(); 

  useEffect(() => {
    getApi("api/service/browse-api?city=" + activeCity)
      .then((response) => {
        const categoryData = response.data.find(
          (category) => category?.slug === params?.serviceId
        );
        console.log(response.data)
        setData(categoryData);
        setServicesData(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false); // Ensure loading is set to false even on error
      });
  }, [params.serviceId]);

  return (
    <div className="md:container mb-8 md:mb-0 md:px-60 px-5 md:mx-auto md:mt-16 mt-4">
      <div className="flex items-center mb-8 border-b pb-3 border-gray-300">
        <IconButton onClick={() => navigate("/")} bg={"transparent"}>
          <IoArrowBackOutline size={isMobile ? 20 : 30} />
        </IconButton>
        <h2 className="md:text-4xl text-xl font-[500] md:ml-3">
          {isLoading ? (
            <Skeleton height="40px" width="200px" />
          ) : (
            data?.title
          )}
        </h2>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 "> {/* Added gap-4 for spacing */}
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Box key={index} padding="6" boxShadow="lg" bg="white">
              <Skeleton height="200px" />
              <SkeletonText mt="4" noOfLines={1} spacing="4" />
            </Box>
          ))
        ) : (
          data?.services?.map((service) => (
            <Link key={service.id} to={`/service/${service?.slug}`}>
              <div className="md:w-[240px] rounded-lg text-card-foreground mb-4"> {/* Added mb-4 for margin-bottom */}
                <img
                  width={"100%"}
                  height={250}
                  alt={service?.title}
                  src={service?.image}
                  className="rounded shadow"
                  style={{
                    aspectRatio: "300 / 200",
                    objectFit: "cover",
                  }}
                />
                <h5 className="md:whitespace-nowrap mt-3 text-lg font-semibold leading-none tracking-tight">
                  {service?.title}
                </h5>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceCategory;