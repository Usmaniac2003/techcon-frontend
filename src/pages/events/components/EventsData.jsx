import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../../../services/api";
import Skeleton from "react-loading-skeleton";

const EventsData = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      setLoading(true);
      const response = await getApi(`/api/events?category=${data?._id}`);
      if (response.status === 200) {
        setEvents(response.data?.data || []);
      } else {
        toast.error("Failed to fetch events");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something failed");
    }
  };

  useEffect(() => {
    if(data !== "Overview") {
        getEvents();
    }
  }, [data?._id]);
  return (
    <div className="px-6 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {data?.name} Events
      </h1>
      <p className="text-gray-600 mb-8">{data?.description}</p>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={event?.image}
                alt={event?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {event?.name}
                </h2>
                <p className="text-sm text-gray-600">{event?.description}</p>
                <p className="text-sm text-gray-600 mt-2">{event?.date}</p>
                <p className="text-sm text-gray-600 font-bold mt-4">
                  Venue: {event?.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsData;
