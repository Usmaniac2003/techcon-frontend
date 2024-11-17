import _ from "lodash";
import { useEffect, useRef } from "react";

const CategoryTab = ({
  setActiveCategory,
  detail,
  activeCategory,
  activeCategoryTab,
  setActiveCategoryTab,
  setIsScrolling,
  isScrolling,
}) => {
  const elemRef = useRef(null);

  useEffect(() => {
    if (activeCategory === detail?.id || activeCategoryTab === detail?.id) {
      if (activeCategory) {
        setIsScrolling(true);

        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
      elemRef.current.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory, activeCategoryTab]);

  return (
    <div
      ref={elemRef}
      onClick={() => {
        if (!isScrolling) {
          setActiveCategoryTab(null);
          setActiveCategory(detail?.id);
        }
      }}
      className={`py-3 cursor-pointer select-none mr-1 px-6 rounded-[30px] whitespace-nowrap w-max ${
        activeCategory === detail?.id || activeCategoryTab === detail?.id
          ? "bg-secondary text-primary border-primary"
          : "text-gray-500 border-gray-500"
      } font-bold border`}
    >
      <p>{detail?.name}</p>
    </div>
  );
};

export default CategoryTab;
