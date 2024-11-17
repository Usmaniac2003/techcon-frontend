import { Input } from "@chakra-ui/react";
import TopServiceCategories from "../../components/browse/TopServiceCategories";
import Browse from "../browse";
import Footer from "../../components/Footer";
import FamilyPoster from "../../components/home/FamilyPoster";
import HeroBg from "../../assets/home-hero.jpg";
import { useTranslation } from "react-i18next";
import Feedbacks from "../../components/home/Feedbacks";
import Coupons from "../../components/home/Coupons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { getApi } from "../../services/api";
import { toast } from "react-toastify";
import { useStateContext } from "../../contexts/StateContext";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const { t } = useTranslation();
  const [searchedItems, setSearchedItems] = useState([]);
  const [AllServicesLoading, setAllServicesLoading] = useState(false);
  const [AllServices, setAllServices] = useState([]);
  const { activeCity, setActiveCity } = useStateContext();
  const [searchVal, setSearchVal] = useState("");
  const [showTypingAnim, setShowTypingAnim] = useState(true);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchVal(val);
  };

  const fetchAllServices = async () => {
    try {
      setAllServicesLoading(true);
      const response = await getApi(
        "api/service/search-services?city=" + activeCity
      );

      setAllServices(response.data?.data || []);
      setAllServicesLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Sorry, something went wrong!");
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  useEffect(() => {
    if (searchVal) {
      const searchedItems = AllServices.filter((service) =>
        service.service.toLowerCase().includes(searchVal?.trim()?.toLowerCase())
      );
      setSearchedItems(searchedItems);
    } else {
      setSearchedItems([]);
    }
  }, [searchVal]);
  return (
    <>
      <div
        className="relative flex items-center md:h-[330px] h-[380px] bg-black md:pb-3 pb-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="flex md:w-[47%] w-full mx-auto relative z-1 flex-col text-white">
          <h1
            className="text-center text-3xl md:text-5xl font-bold mb-6"
            style={{ textShadow: "0px 2px 13px white" }}
          >
            {t("Where")}{" "}
            <span className="underline--magical">{t("Expertise")}</span>{" "}
            {t("Comes First")}
          </h1>
          <div className="w-[90%] mx-auto relative md:w-full">
            {showTypingAnim && (
              <TypeAnimation
                className="absolute top-[50%] left-6"
                sequence={[
                  "Home Cleaning",
                  1000,
                  "Furniture",
                  1000,
                  "Handyman",
                  1000,
                ]}
                style={{
                  fontSize: "16px",
                  color: "#fff",
                  transform: "translateY(-50%)",
                }}
                repeat={Infinity}
              />
            )}
            <Input
              // placeholder={t("Search..")}
              padding={"25px"}
              onInput={handleSearch}
              background={"#000000b0"}
              borderColor={"#ffffff59"}
              disabled={AllServicesLoading}
              color={"white"}
              borderRadius={"30px"}
              margin={"0 auto"}
              onFocus={() => setShowTypingAnim(false)}
              onBlur={() => !searchVal && setShowTypingAnim(true)}
              pr={10}
              value={searchVal}
            />
            {!!searchVal.length && (
              <div
                className="absolute right-4 top-[50%]"
                style={{ transform: "translateY(-50%)" }}
              >
                <IoMdClose
                  className="cursor-pointer"
                  onClick={() => {
                    setShowTypingAnim(true);
                    setSearchVal("");
                  }}
                  color="white"
                />
              </div>
            )}

            <div
              style={{ backdropFilter: "blur(8px)" }}
              className="absolute z-10 searched-items-container overflow-y-scroll top-[120%] max-h-[300px] text-[#000101] rounded bg-[white] shadow-lg w-[60%] left-0 right-0"
            >
              {searchedItems.map((item) => {
                return (
                  <Link key={item.id} to={`/service/${item?.slug}`}>
                    <div
                      className="py-2 px-3 cursor-pointer hover:bg-[#f3f3f3]"
                      key={item.id}
                    >
                      {item.service}{" "}
                      {activeCity === null && (
                        <span className="italic">in {item?.cityId?.name}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-2">
            <TopServiceCategories />
          </div>
        </div>
      </div>
      {/* <div className="bg-primary">
        <div className="md:container md:w-[60%] w-[80%] mx-auto py-2 text-white">
          <TopServiceCategories/>
        </div>
      </div> */}
      {activeCity && <Coupons />}
      <div className="my-8">
        <Browse />
      </div>

      <Feedbacks />
      <FamilyPoster />
      <Footer />
    </>
  );
};

export default Home;
