import { createRef, useEffect, useRef, useState } from "react";
import ServiceDetailsOptions from "../ServiceDetailsOptions";
import CategoryTab from "../components/CategoryTab";

const ServiceDetails = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(data ? data[0]?.id : "");
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);


  return (
    <div className="pt-20 relative">
      <div className="absolute scroll-smooth categories-container pb-2 top-0 z-10 bg-white left-0 right-0 overflow-x-scroll flex items-center">
        {data?.map((detail) => {
          return (
            <CategoryTab
            isScrolling={isScrolling}
              setActiveCategoryTab={setActiveCategoryTab}
              activeCategory={activeCategory}
              detail={detail}
              setActiveCategory={setActiveCategory}
              setIsScrolling={setIsScrolling}
              activeCategoryTab={activeCategoryTab}
              key={detail?.name}
            />
          );
        })}
      </div>
      <ServiceDetailsOptions
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveCategoryTab={setActiveCategoryTab}
        data={data || []}
        isScrolling={isScrolling}
      />
    </div>
  );
};

export default ServiceDetails;
