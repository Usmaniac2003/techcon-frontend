import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { FaMusic, FaFootballBall, FaUsers } from "react-icons/fa"; // Import icons
import { toast } from "react-toastify";
import { getApi } from "../../services/api";
import EventsData from "./components/EventsData";
import Overview from "./components/Overview";

const icons = {
  "music": <FaMusic/>, 
  "social": <FaUsers/>, 
  "sports": <FaFootballBall/>
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Overview");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getApi("api/events/types");
      const data = response.data?.data || [];
      setCategories(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ChakraProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div style={{zIndex: 500}} className="w-1/6 mt-[75px] fixed top-0 left-0 h-screen bg-black text-white p-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.slug}
                className={`cursor-pointer p-2 rounded flex items-center space-x-3 ${
                  selectedCategory?.name === category.name
                    ? "bg-gray-700"
                    : "hover:bg-gray-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="text-xl">{icons[category.slug]}</span>
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/6"></div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-6 ">
          <Box className="text-center">
            {selectedCategory === "Overview" ? (
             <Overview/>
            ) : (
              <EventsData data={selectedCategory} />

            )}
          </Box>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default App;
