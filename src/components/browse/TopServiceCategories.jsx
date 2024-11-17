import { Link } from "react-router-dom";
import { getApi } from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../contexts/StateContext";

const getIcon = slug => {
  let pathstr = "/service-icons/"; 
  if(slug?.startsWith("general-cleaning")) {
    return pathstr + "general-cleaning.svg"; 
  } else if(slug?.startsWith("handyman-and-maintenance")) {
    return pathstr + "handyman.svg"; 
  } else if(slug?.startsWith("ac-cleaning")) {
    return pathstr + "ac-cleaning.svg"; 
  } else if(slug?.startsWith("deep-and-furniture")) {
    return pathstr + "deep-and-furniture.svg"; 
  } else {
    return ""; 
  }
}

const TopServiceCategories = () => {
  const [data, setData] = useState([]);
  const { activeCity } = useStateContext();
  useEffect(() => {
    getApi("api/service/categories?city=" + activeCity)
      .then((response) => {
        setData(response.data.categories);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  return (
    <div
      className={`flex items-center space-x-2 flex-wrap py-3`}
    >
      {data.slice(0, 4).map((item) => {
        return (
          <Link key={item._id} to={{ pathname: `category/${item.slug}` }}>
            <div style={{fontSize: 13}} className="flex text-white py-1 px-4 rounded-full text-center flex-col items-center">
              <div className="mb-4 relative flex justify-center rounded-full border-2 border-[#ffffff3b] w-[48px] h-[48px] items-center">
                <img
                  src={(getIcon(item?.slug))}
                  width={"100%"}
                  className="absolute -bottom-2 left-0 right-0"
                />
              </div>
              <p className="hidden md:block">{item.category}</p>
            </div> 
          </Link>
        );
      })}
    </div>
  );
};

export default TopServiceCategories;
