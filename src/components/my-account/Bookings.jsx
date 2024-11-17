import { Flex, IconButton, Skeleton } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useStateContext } from "../../contexts/StateContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../services/api";
import { useAuthContext } from "../../contexts/AuthContext";
import { BiRefresh } from "react-icons/bi";

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const Bookings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isMobile, statuses } = useStateContext();
  const { USER } = useAuthContext();

  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getApi("api/leads/getByCustomer/" + USER?._id);
      setData(data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <>
      <div className="mt-8 mb-10 flex flex-col items-center">
        <div className="w-[90%] md:w-[30%]">
          <IconButton onClick={() => history.back()} bg={"transparent"}>
            <IoArrowBackOutline size={isMobile ? 20 : 30} />
          </IconButton>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <p className="text-xl ml-3 mt-2 font-bold">{t("Bookings")}</p>
            <IconButton onClick={fetchData}>
              <BiRefresh size={20}/>
            </IconButton>
          </Flex>

          <Skeleton minHeight={150} mt={4} isLoaded={!loading}>
            <div>
              {[
                data?.length === 0 ? (
                  <p>{t("No bookings found")}</p>
                ) : (
                  data.map((lead) => {
                    return (
                      <div
                        key={lead?._id}
                        className="border shadow rounded-lg p-3 w-full mb-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">{lead?.type}</p>
                          <span
                            style={{
                              color: statuses[lead?.status]?.text,
                              background: statuses[lead?.status]?.bg,
                            }}
                            className={` text-sm font-bold rounded-md py-1 px-2`}
                          >
                            {statuses[lead?.status]?.label || "Pending"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-400">
                            {formatDate(new Date(lead?.dateAndTime?.date))}{" "}
                            {", "} {lead?.dateAndTime?.startTime}
                          </p>
                        </div>
                        <div className="mt-3">
                          <span className="underline">Auto Assign</span>
                        </div>
                      </div>
                    );
                  })
                ),
              ]}
            </div>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default Bookings;
